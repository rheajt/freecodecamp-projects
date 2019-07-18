'use strict';

var request = require('request');
var gm = require('gm').subClass({imageMagick:true});

module.exports = function(app, passport) {

  app.route('/')
    .get(function (req, res) {
       res.sendFile(process.cwd() + '/public/index.html');
    });

  app.route('/auth/facebook')
    .get(passport.authenticate('facebook', {scope: ['email']}));

  app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook'), function(req, res) {
      res.redirect('/');
    });

  app.route('/auth/user')
    .get(function(req, res) {
      if(req.user) {
        res.send(req.user);
      } else {
        res.send('Not logged in');
      }
    });

  app.route('/api/user/photo')
    .post(function(req, res) {

      request('http:' + req.body.userPic, function(err, response, body) {

        res.send(body);

      })
    })

};
