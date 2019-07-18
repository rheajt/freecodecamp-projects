var express = require('express');
var mongo = require('mongodb');
var dotenv = require('dotenv').load();
var ImageSearch = require(process.cwd() + '/server/searchController.server');

var app = express();
var port = process.env.PORT || 8080;

mongo.connect(process.env.MONGOLAB_URI, function(err, db) {
  if(err) {
    throw new Error('Error connecting to the database: ' + err);
  }

  var search = new ImageSearch(db);

  app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/index.html');
  });

  app.get('/search/new/:query', search.newSearch);

  app.get('/search/recent', search.recent);

  app.listen(port, function() {
    console.log('Listening on ' + port + '...');
  });
});