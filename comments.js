// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = require('./comments.json');

// Parse json
app.use(bodyParser.json());

// Get comments
app.get('/comments', function(req, res){
  res.json(comments);
});

// Post comments
app.post('/comments', function(req, res){
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err){
    if(err){
      console.error(err);
      process.exit(1);
    }
  });
  res.status(200).end();
});

// Set port
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});