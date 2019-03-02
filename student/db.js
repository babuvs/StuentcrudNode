var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017";

var dbconnect;

exports.dbConnection = function () {
    return new Promise((resolve) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) return console.log(err)
            dbconnect = db.db('student');
            resolve(dbconnect)
        });
    })

}
exports.url = url;
exports.ObjectId = ObjectID;

