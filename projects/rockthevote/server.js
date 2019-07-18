var express = require('express'),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session');

require('dotenv').load();

mongoose.connect(process.env.MONGO_URL);

var app = express();
var port = process.env.PORT || 8080;
//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
  secret: 'thereisnoothertime',
  resave: false,
  saveUninitialized: false
}));
require('./server/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//public route
app.use('/public', express.static(__dirname + '/public'));

require('./server/routes/api')(app, passport);

app.listen(port, function() {
  console.log('Magic on port ' + port + '...');
});