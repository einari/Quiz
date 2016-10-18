import https from "https";
import express from "express";
import Quizes from "./Quizes";
import rabbit from "rabbit.js";


let app = express();
app.get("/server/*", (request, response, next) => {
    response.status(404);
    response.end();
});

new Quizes(app);

app.use(express.static(__dirname+"/../"));

/*
let context = rabbit.createContext("amqp://192.168.50.50");
context.on("ready", () => {
    console.log("Ready");
    let pub = context.socket("PUB");
    let sub = context.socket("SUB");

    //sub.pipe(process.stdout);
    sub.setEncoding("utf8");
    sub.on("data", message => {
        console.log(`Message : ${message}`);
    });

    sub.connect("events", () => {
        pub.connect("events", () => {

            app.get("/message", (request, response) => {
                pub.write(JSON.stringify({weclome: `Time : ${new Date()}`}), "utf8");
                response.status(200);
                response.end();
            })
        });
    });
});
*/

console.log("Start Express server");
app.listen(3001, () => {
    console.log("Running on port 3001");
});