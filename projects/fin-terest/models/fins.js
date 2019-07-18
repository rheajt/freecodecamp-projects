var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Fin = new Schema({
  url: String,
  owner: String
});

module.exports = mongoose.model('Fin', Fin);