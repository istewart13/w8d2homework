var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var url = 'mongodb://localhost:27017/farm';
var ObjectID = require("mongodb").ObjectID;

app.get('/animals', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('animals');
    collection.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
})

app.post('/animals', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('animals');
    collection.insert({name: req.body.name, type: req.body.type, age: req.body.age});
    res.status(200).end()
    db.close();
  })
})

app.put('/animals/:id', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('animals');
    collection.updateOne({_id: new ObjectID(req.params.id)}, {$set: {name: req.body.name, type: req.body.type, age: req.body.age}});
    res.status(200).end()
    db.close();
  })
})

app.delete('/animals/:id', function(req, res) {
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('animals');
    collection.remove({_id: new ObjectID(req.params.id)});
    res.status(200).end()
    db.close();
  })
})

// app.get('/', function(req, res) {
//   var request = new XMLHttpRequest();
//   request.open("POST", url);
//   request.setRequestHeader("Content-Type", "application/json");
//   request.onload = function(){
//     if(request.status === 200){
//     }
//   }
//     request.send(JSON.stringify( //**YOUR OBJECT HERE **//  ));
//   })

    app.listen('3000', function() {
      console.log('running on 3000');
    })