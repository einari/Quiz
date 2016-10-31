import {quizMessages} from "./QuizMessages";
import {namingService} from "./NamingService";

import pg from "pg";

export default class Quizes {
    constructor(express) {
        let self = this;

        this.connect().then((pool,client) => {
            console.log("Connected");
            pool.query("CREATE TABLE IF NOT EXISTS quizes(id UUID, details JSON)");
        });


        express.post("/quizes", (request, response, next) => {
            console.log("post");
            self.create(request.body);
            response.status(200).json({status:"ok"});
        });

        express.put("/quizes", (request, response, next) => {
            console.log("put");
            self.update(request.body);
            response.status(200).json({status:"ok"});
        });

        express.get("/quizes", (request, response, next) => {
            self.getAll().then(all => {
                response.send(all);
            });
        });
    }

    connect() {
        let promise = new Promise((resolve, reject) => {
            
            namingService.resolveEndpoint("QuizAdministration", "QuizAdministration/Data", "PostgreSQLPort").then(endpoint => {
                let endpointAndPort = endpoint.split(':');
                let host = endpointAndPort[0];

                let config = {
                    user: "postgres",
                    password: "mysecretpassword",
                    database: "postgres",
                    host: host
                };

                console.log(`Connect to PostgreSQL on : ${endpoint}`);
                let pool = new pg.Pool(config);
                pool.connect((error, client, done) => {
                    resolve(pool, client);
                });
            });
        });
        return promise;
    }

    create(quiz) {
        quizMessages.added(quiz);

        this.connect().then((pool, client) => {
            pool.query(`INSERT INTO quizes(id, details) values ('${quiz.id}','${JSON.stringify(quiz)}')`);
        });
    }

    update(quiz) {
        quizMessages.updated(quiz);

        this.connect().then((pool, client) => {
            pool.query(`UPDATE quizes SET details='${JSON.stringify(quiz)}' WHERE id='${quiz.id}'`);
        });
    }

    getAll() {
        var self = this;
        let promise = new Promise((resolve, reject) => {
            self.connect().then((pool, client) => {
                pool.query("SELECT details FROM quizes").then((result) => {
                    let rows = [];
                    result.rows.forEach(row => rows.push(row.details));
                    resolve(rows);
                });
            });
        });
        return promise;
    }
}
