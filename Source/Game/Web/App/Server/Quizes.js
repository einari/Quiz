import {quizMessages} from "./QuizMessages";
import mongoClient from "mongodb";

export default class Quizes {
    constructor(express) {
        let self = this;
        quizMessages.quizAdded.subscribe(quiz => self.insert(quiz));

        express.get("/quizes", (request, response, next) => {
            self.getAll().then(all => {
                response.send(all);
            });
        });
    }

    connect() {
        let promise = new Promise((resolve, reject) => {
            let mongoDbUrl = "mongodb://192.168.50.50:27017/myproject";
            mongoClient.connect(mongoDbUrl, (error, db) => {
                resolve(db);
            });
        });
        return promise;
    }

    insert(quiz) {
        //console.log("Insert quiz: "+JSON.stringify(quiz));
        this.connect().then(db => {
            let quizesCollection = db.collection("Quizes");
            quizesCollection.insert(quiz);
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
