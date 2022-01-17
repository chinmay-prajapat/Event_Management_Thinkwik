const mongodb = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
const MongoClient = mongodb.MongoClient;
const connetionURL =
  "mongodb+srv://chinmay:chinmay@cluster0.1mw3a.mongodb.net/EventManagement?retryWrites=true&w=majority";
const databaseName = "event-management";

MongoClient.connect(
  connetionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("error");
    }
    const db = client.db(databaseName);

    db.collection("users").find(
      { _id: new ObjectID("61e3d641aa453f579a86b59a") },
      (error, user) => {
        if (error) {
          console.log("Error");
        }
        console.log(user);
      }
    );
  }
);
