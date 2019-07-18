var express = require('express');
var mongoose = require('mongoose');
var Stock = require('./server/stock.model');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/theshortrun');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  // new connection gets all the stocks in the db;
  Stock.findOne({}, function(err, allStocks) {
    if(err) throw err;
    if(allStocks) {
      socket.emit('all stocks', allStocks.stocks);
    }
  });

  // add a new stock to the list
  socket.on('add stock', function(stock) {
    Stock.findOneAndUpdate({}, {$addToSet: {stocks: stock}}, {new: true, upsert: true}, function(err, result) {
      if(err) throw err;
      if(result) {
        socket.broadcast.emit('update add stock', stock);
      }
    });

  });

  socket.on('remove stock', function(stock) {
    console.log('remove attempt');
    Stock.findOneAndUpdate({}, {$pull: {stocks: stock.stockName}}, function(err, newStockList) {
      if(err) throw err;
      io.emit('update remove stock', stock.id);
    });
  });
});

http.listen(process.env.PORT);