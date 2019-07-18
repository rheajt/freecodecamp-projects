var express = require('express');
var router = express.Router();

var Api = require('../controllers/apiHandler');
var api = new Api();


module.exports = function(app, passport) {


  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.send(__dirname + '/public/index.html');
  });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter'), function(req, res) {
      res.redirect('/');
    });

  app.route('/auth/user')
    .get(function(req, res) {
      res.send(req.user);
    });

  app.route('/auth/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });

  app.route('/api/fins')
    .get(api.getFins)
    .post(api.postFin);

  app.route('/api/fins/:user')
    .get(api.getUserFins);

  app.route('/api/fin/:finId')
    .delete(api.deleteFin);

  app.route('/api/users/all')
    .get(api.getAllUsers);

};
