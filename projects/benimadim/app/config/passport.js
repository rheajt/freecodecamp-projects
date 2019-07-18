'use strict';

var FacebookStrategy = require('passport-facebook');
var User = require('../models/user');

module.exports = function(passport) {

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.APP_URL + "auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function() {
      var newUser = {
        uid: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      };

      User.findOneAndUpdate({uid: profile.id}, newUser, {upsert: true}, function(err, doc) {
        return cb(err, doc);
      });

    })
  }
));
}