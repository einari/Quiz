import https from "https";
import express from "express";

let app = express();
app.get("/server/*", (request, response, next) => {
    response.status(404);
    response.end();
});

app.use(express.static(__dirname+"/../"));

/*
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}


import mongoClient from "mongodb";
let mongoDbUrl = "mongodb://localhost:27017/myproject";

console.log("Connect to MongoDB");
mongoClient.connect(mongoDbUrl, (error, db) => {
    if( error ) {
        console.log("Error");
    } else {
        console.log("Connected to DB");
        findDocuments(db, () => {
            console.log("Documents inserted");
            db.close();
        });
    }
});
*/

console.log("Start Express server");
app.listen(3000, () => {


    console.log("Running on port 3000");
});