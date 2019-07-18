var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('./user.model');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(user, done) {
    User.findById(user, function(err, id) {
      done(err, id);
    });
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.APP_URL + '/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {

        User.findById({ _id: profile.id }, function (err, user) {
          if(err) throw err;

          if(user) {

            return done(null, user);
          } else {

            var newUser = new User();

            newUser._id = profile.id;
            newUser.displayName = profile.displayName;
            newUser.nickName = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.profilePicture = profile.photos[0].value;

            newUser.save(function(err, saved) {
              return done(null, newUser);
            })
          }
        });


      })
    }
  ));

}