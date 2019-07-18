var User = require('../models/users');

var GoingToHandler = function() {

  this.setGoingto = function(req, res) {
    User
      .findOneAndUpdate({'facebook.id': req.user.facebook.id}, {
        goingTo: {
          barName: req.body.goingTo,
          goingOn: Date.now()
        }
      }, {new: true})
      .exec(function(err, result) {
        if(err) throw err;
        res.send(result);
      });
  }

  this.friends = function(req, res) {
    User
      .find({})
      .exec(function(err, result) {
        if(err) throw err;
        res.send(result);
      });
  }

  this.notGoing = function(req, res) {
    User
      .findOneAndUpdate({'facebook.id': req.user.facebook.id}, {
        goingTo: {
          barName: 'nowhere',
          goingOn: Date.now()
        }
      }, {new: true})
      .exec(function(err, result) {
        if(err) throw err;
        res.send(result);
      });
  }

};

module.exports = GoingToHandler;