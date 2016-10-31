import { quizMessages } from "./QuizMessages";
import { namingService } from "./NamingService";
import mongoClient from "mongodb";

export default class Quizes {
    constructor(express) {
        let self = this;
        quizMessages.quizAdded.subscribe(quiz => self.save(quiz));
        quizMessages.quizUpdated.subscribe(quiz => self.save(quiz));

        express.get("/quizes", (request, response, next) => {
            self.getAll().then(all => {
                response.send(all);
            });
        });

        self.mongoDbUrl = null;
        namingService.resolveEndpoint("QuizGame", "QuizGame/Data", "MongoProcessPort").then(endpoint => {
            self.mongoDbUrl = `mongodb://${endpoint}/quiz`;
            console.log(`Mongo url ${self.mongoDbUrl}`);
        });
    }

    connect() {
        console.log("Connect");
        let self = this;
        let promise = new Promise((resolve, reject) => {
            let connect = () => {
                let mongoDbUrl = self.mongoDbUrl;
                mongoClient.connect(mongoDbUrl, (error, db) => {
                    console.log(`Connected to ${self.mongoDbUrl} - ${error} - ${db}`);
                    resolve(db);
                });
            };

            let connecting = true;
            while (connecting) {
                let tryConnect = () => {
                    console.log(`Trying to connect to ${self.mongoDbUrl}`);
                    if (self.mongoDbUrl) {
                        connect();
                        connecting = false;
                    }
                };

                tryConnect();

                if (!connecting) break;

                setTimeout(tryConnect,500);
            }
        });
        return promise;
    }

    save(quiz) {
        console.log("Save quiz: " + JSON.stringify(quiz));
        this.connect().then(db => {
            let quizesCollection = db.collection("Quizes");
            quiz._id = quiz.id;
            quizesCollection.save(quiz);
        });
    }

    getAll() {
        var self = this;
        let promise = new Promise((resolve, reject) => {
            self.connect().then(db => {
                let quizesCollection = db.collection("Quizes");
                quizesCollection.find({}).toArray((error, documents) => resolve(documents));
            });
        });
        return promise;
    }
}
