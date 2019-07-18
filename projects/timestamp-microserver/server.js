var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

app.get('/:time', function(req, res) {
  var param = +req.params.time * 1000;

  if(isNaN(param)) {
    param = req.params.time;
  }

  var newDate = new Date(param);
  var naturalTime, unixTime;

  if(newDate.toDateString() === 'Invalid Date') {
    naturalTime = null;
    unixTime = null;
  } else {
    naturalTime = newDate.toDateString();
    unixTime = Math.round(newDate.getTime() / 1000);
  }

  res.json({
    natural: naturalTime,
    unix: unixTime
  });
});

app.listen(port, function() {
  console.log('listening on port ' + port + '...');
});