var express = require('express');
var headerparser = require('./server/controllers/parseController');

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

// api/getmyinfo call

app.get('/api/getmyinfo', function(req, res) {
  var ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var language = headerparser.getLanguage(req.headers['accept-language']);
  var software = headerparser.getSoftware(req.headers['user-agent'])
  // console.log(req.headers['user-agent']);
  res.json({
    "ipaddress": ipaddress,
    "language": language,
    "software": software
  });
});

app.listen(port, function() {
  console.log('Gettin it done on port ' + port + '...');
});