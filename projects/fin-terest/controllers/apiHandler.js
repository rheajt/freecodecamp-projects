var User = require('../models/users');
var Fins = require('../models/fins');

function Api() {

  this.getFins = function(req, res) {
    Fins.find({}, function(err, allFins) {
      if(err) throw err;
      res.send(allFins);
    });
  }

  this.getUserFins = function(req, res) {
    Fins.find({owner: req.params.user}, function(err, userFins) {
      if(err) throw err;
      res.send(userFins);
    });
  }

  this.postFin = function(req, res) {
    var newFin = new Fins({
      url: req.body.url,
      owner: req.user.username
    });

    newFin.save(function(err, saved) {
      if(err) throw err;

      res.send({msg: 'fin posted'});
    });
  }

  this.deleteFin = function(req, res) {
    Fins.findOneAndRemove({_id: req.params.finId}, function(err, deleted) {
      if(err) throw err;
      res.send({msg: 'fin removed'});
    })
  }

  this.getAllUsers = function(req, res) {
    User.find({}, function(err, users) {
      if(err) throw err;
      res.send(users);
    })
  }
}

module.exports = Api;