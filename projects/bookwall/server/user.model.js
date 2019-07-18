var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
  _id: String,
  displayName: String,
  nickName: String,
  profilePicture: String,
  email: String,
  description: String,
  booksOwned: Array
});

module.exports = mongoose.model('User', User);