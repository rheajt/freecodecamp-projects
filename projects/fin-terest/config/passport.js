'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/users');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(user, done) {
    User.findById(user, function(err, id) {
      done(err, id);
    });
  });

  passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.APP_URL + "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
      process.nextTick(function() {
        User.findOneAndUpdate({_id: profile.id}, profile, {upsert:true, new:true}, function(err, user) {
          return cb(err, user);
        })
      })
    }
  ));

};