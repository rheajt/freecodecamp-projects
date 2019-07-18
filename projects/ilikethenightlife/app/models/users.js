'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	facebook: {
		id: String,
		displayName: String,
    profileImg: String
	},
  goingTo: {
    barName: {type: String, default: 'nowhere'},
    goingOn: {type: Date, default: Date.now}
  }
});

module.exports = mongoose.model('User', User);
