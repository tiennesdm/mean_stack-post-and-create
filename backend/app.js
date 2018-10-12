const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();
const MongoClient = require('mongodb').MongoClient;

// Connection url
const url = "mongodb+srv://shubhamd:e3jemXI0AtPaw8wT@mean-srts7.mongodb.net/node-angular?retryWrites=true";

MongoClient.connect(url, function(err, db){
	if(err){
		return console.dir(err);
	}
	console.log('Connected to mongodb');

	/*
	InsertDocument(db, function(){
		db.close();
	});
	*/

	/*
	InsertDocuments(db, function(){
		db.close();
	});
	*/
});

/*mongoose
  .connect(
    "mongodb+srv://shubhamd:e3jemXI0AtPaw8wT@mean-srts7.mongodb.net/node-angular?retryWrites=true",
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
//mongo "mongodb://mean-shard-00-00-srts7.mongodb.net:27017,mean-shard-00-01-srts7.mongodb.net:27017,mean-shard-00-02-srts7.mongodb.net:27017/test?replicaSet=mean-shard-0" --ssl --authenticationDatabase admin --username shubhamd --password e3jemXI0AtPaw8wT
//"mongodb+srv://shubhamd:e3jemXI0AtPaw8wT@mean-srts7.mongodb.net/node-angular?retryWrites=true",
//{ useNewUrlParser: true }
