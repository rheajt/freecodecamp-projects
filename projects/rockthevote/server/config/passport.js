var Strategy = require('passport-facebook').Strategy;
var User = require('../models/users');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({id: id}, function(err, user) {
      done(err, user);
    })
  });

  passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.APP_URL + 'auth/facebook/callback'
  }, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({id: profile.id}, function(err, user) {
        if(err) return done(err);

        if(user) {
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.id = profile.id;
          newUser.displayName = profile.displayName;
          newUser.email = profile.email;

          newUser.save(function(err) {
            return done(null, newUser);
          });
        }
      });

    });

  }));
}