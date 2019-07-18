'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var routes = require('./app/routes/index.js');

var app = express();
var port = process.env.PORT || 8080;
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/benimadim');

app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({
  secret: 'keepitsecretkeepitsafe',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

routes(app, passport);

app.listen(port, function () {
  console.log('Node.js listening on port ' + port);
});

