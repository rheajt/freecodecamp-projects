var express = require('express');
var mongo = require('mongodb');
var dotenv = require('dotenv').load();

var app = express();
var port = process.env.PORT || 8080;
var urlControl = require(process.cwd() + '/server/controllers/urlControl.server');

mongo.connect(process.env.MONGOLAB_URI, function (err, db) {

   if (err) {
      throw err;
   }

   //instantiate the controller
   var urlCtrl = new urlControl(db);

   //basic index route to provide examples
   app.get('/', function(req, res) {
     res.sendFile(process.cwd() + '/public/index.html');
   });

   //redirect to long url
   app.get('/:shortId', urlCtrl.redirect);

   //shortener route
   app.get('/shorten/:url(*)', urlCtrl.addUrl);

   app.listen(port, function () {
      console.log('Listening on port ' + port + '...');
   });

});
