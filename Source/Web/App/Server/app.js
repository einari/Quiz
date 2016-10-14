import https from "https";
import express from "express";

let app = express();
app.get("/server/*", (request, response, next) => {
    response.status(404);
    response.end();
});

app.use(express.static(__dirname+"/../"));

app.listen(3000, () => {
    console.log("Running on port 3000");
});