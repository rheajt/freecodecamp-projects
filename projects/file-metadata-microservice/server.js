var express = require('express');
var multer = require('multer');
var upload = multer();

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.post('/upload', upload.single('file'), function(req, res) {
  res.send({filesize: req.file.size});
});

app.listen(port, function() {
  console.log('Open for business on ' + port + '...');
});