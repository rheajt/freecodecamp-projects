'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  uid: String,
  displayName: String,
  email: String,
  photo: String
});

module.exports = mongoose.model('User', User);