var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

require('dotenv').load();
require('./server/passport.config')(passport);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bookwall');

app.use(session({
  secret: 'thisisthesecret',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.send(__dirname + 'client/index.html');
});

require('./server/api')(app, passport);

server.listen(process.env.PORT || 8080);



