var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Book = new Schema({
  _id: String,
  title: String,
  author: String,
  rating: Number,
  imageUrl: String,
  ownedBy: String,
  requestedBy: String
});

module.exports = mongoose.model('Book', Book);