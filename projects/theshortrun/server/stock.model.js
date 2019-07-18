var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
  stocks: Array
});

module.exports = mongoose.model('Stock', StockSchema);