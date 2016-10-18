import https from "https";
import http from "http";
import express from "express";
import Quizes from "./Quizes";
import Attempts from "./Attempts";
import bodyParser from "body-parser";
import socketio from "socket.io";

let app = express();
let server = http.Server(app);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/server/*", (request, response, next) => {
    response.status(404);
    response.end();
});

new Quizes(app);
new Attempts(app);

app.use(express.static(__dirname+"/../"));


let io = socketio(server);
io.on("connection", socket => {
    socket.emit("Quiz", {hello: "world"});

    socket.on("MyOtherEvent", data => {
        console.log(data);

    });
});

console.log("Start server");
server.listen(3000, () => {
    console.log("Running on port 3000");
});
