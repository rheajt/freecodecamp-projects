var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  question: String,
  creator: String,
  creatorId: String,
  responses: [{
    answer: String,
    votes: {type: Number, default:0}
  }],
  voters: Array
});

module.exports = mongoose.model('Poll', Poll);