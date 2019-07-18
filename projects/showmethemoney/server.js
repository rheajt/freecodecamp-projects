var express = require('express');
var request = require('request');

var app = express();
require('dotenv').load();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('/api/:ticker', function(req, res) {
  var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + req.params.ticker + '.json?auth_token=' + process.env.QUANDL_KEY;

  request({
    method: 'GET',
    url: url
  }, function(err, response, body) {
    var data = JSON.parse(body);
    res.json(data);
  });

});

app.listen(process.env.PORT || 8080, function() {
  console.log('listening');
});