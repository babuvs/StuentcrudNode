var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
var MongoClient = require('./student/db.js');

var url = MongoClient.url;
var ObjectID = MongoClient.ObjectId;
var dbconnect;

MongoClient.dbConnection().then((connection) => {
  dbconnect = connection;
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/student', function (req, res) {
  dbconnect.collection('student').find().toArray(function (err, results) {
    res.send(results);
  })
})

app.get('/student/:id', function (req, res) {
  let id = ObjectID(req.params.id);
  dbconnect.collection('student').findOne({ _id: id }, function (err, results) {
    console.log(id);
    const result = [];
    res.send(results);
  });
});

app.post('/student', (req, res) => {
  console.log(req);
  dbconnect.collection('student').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.send(result);
  })
})

app.put('/student/:id', (req, res) => {
  let id = ObjectID(req.params.id);
  dbconnect.collection('student')
    .updateOne({ _id: id }, {
      $set: req.body
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('update to database')
      res.send(result);
    })
})

app.delete('/student/:id', (req, res) => {
  let id = ObjectID(req.params.id);
  dbconnect.collection('student').deleteOne({ _id: id },
    (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.listen(3000, console.log('db connected'))