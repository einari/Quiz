import https from "https";
import express from "express";
import Quizes from "./Quizes";
import Attempts from "./Attempts";
import bodyParser from "body-parser";

let app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/server/*", (request, response, next) => {
    response.status(404);
    response.end();
});

new Quizes(app);
new Attempts(app);

app.use(express.static(__dirname+"/../"));

console.log("Start Express server");
app.listen(3000, () => {
    console.log("Running on port 3000");
});