var Poll = require('../models/polls');

module.exports = function(app, passport) {

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  }

  app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });

  app.route('/api/polls')
    .get(function(req, res) {
      Poll.find({}, function(err, result) {
        res.status(200).send(result);
      });
    })
    .post(isLoggedIn, function(req, res) {
      var newPoll = new Poll();

      newPoll.question = req.body.question;
      newPoll.creator = 'Jordan Rhea' || req.user.displayName;
      newPoll.creatorId = req.user.id;
      newPoll.responses.push({answer: req.body.answer});

      newPoll.save(function(err, doc) {
        if(err) res.send(err)

        res.send(doc);
      });
    });

  app.route('/api/polls/:id')
    .get(function(req, res) {
      if(req.params.id === 'my') {
        Poll.find({creatorId: req.user.id}, function(err, result) {
          if(err) throw err;

          res.send(result);
        });
      } else if(req.params.id === 'all'){
        console.log(req.params.id);
      } else {
        Poll.findById(req.params.id, {__v: 0}, function(err, doc) {
          if(err) throw err;

          res.send(doc);
        });
      }
    })
    .put(function(req, res) {
      var voterData = req.body.id || req.connection.remoteAddress;

      if(req.body.voteId) {
        Poll.findOneAndUpdate({"responses._id": req.body.voteId, voters: {$ne: voterData}}, {$inc: {"responses.$.votes": 1}, $push: {voters: voterData}}, {new: true}, function(err, result) {
          if(err) throw err;

          res.send(result);
        });
      } else if(req.body.pollId) {
        Poll.findOneAndUpdate({_id: req.body.pollId}, {$push: {responses: req.body}}, {new: true}, function(err, result) {
          if(err) throw err;

          res.send(result);
        });
      }
    })
    .delete(isLoggedIn, function(req, res) {
      Poll.findOneAndRemove({_id: req.params.id}, function(err, result) {
        if(err) throw err;

        res.send(result);
      });
    });

  app.route('/auth/facebook')
    .get(passport.authenticate('facebook', {scope: 'email'}));

  app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
      successRedirect: '/'
    }));

  app.route('/auth/facebook/logout')
    .get(isLoggedIn, function(req, res) {
      req.logout();
      res.redirect('/');
    });

  app.route('/auth/user')
    .get(function(req, res) {
      if(req.user) {
        res.send(req.user);
      } else {
        res.sendStatus(403);
      }
    });

};
