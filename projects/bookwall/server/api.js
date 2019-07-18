var http = require('https');
var parseString = require('xml2js').parseString;

var User = require('./user.model');
var Book = require('./book.model');

module.exports = function(app, passport) {

  // user api routes
  app.route('/api/currentUser')
    .get(function(req, res) {
      if(req.user) {
        res.send(req.user);
      } else {
        res.sendStatus(403);
      }
    });

  app.put('/api/updateUser', function(req, res) {

    User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true}, function(err, updated) {
      if(err) throw err;
      res.send(updated);
    });
  });

  //book api routes
  app.post('/api/book/add', function(req, res) {
    Book.findOneAndUpdate({_id: req.body.book._id}, {ownedBy: req.user._id}, {new: true}, function(err, added) {
      if(err) throw err;

      if(!added) {
        var newBook = new Book(req.body.book);
        newBook.ownedBy = req.user._id;

        newBook.save(function(err) {
          if(err) throw err;

          if(req.user) {
            User.findByIdAndUpdate(req.user._id, {$addToSet: {booksOwned: newBook._id}}, function(err, result) {
              if(err) throw err;
              res.sendStatus(200);
            })
          } else {
            res.sendStatus(200);

          }
        })
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.post('/api/book/remove', function(req, res) {
    Book.findOneAndRemove({_id: req.body.book._id}, function(err, updated) {
      if(err) throw err;

      User.findOneAndUpdate({_id: req.user._id}, {$pull: {booksOwned: req.body.book._id}}, {new: true}, function(err, user) {
        if(err) throw err;

        res.send(user);
      })
    });
  })

  app.route('/api/book/request')
    .get(function(req, res) {
      Book.find({ownedBy: req.user._id}, function(err, book) {
        if(err) throw err;

        res.send(book);
      })
    })
    .put(function(req, res) {

      Book.findOneAndUpdate({_id: req.body._id}, {requestedBy: req.user._id}, {new: true}, function(err, updated) {
        if(err) throw err;

        res.send(updated);
      });
    });

  app.get('/api/books', function(req, res) {
    Book.find({}, function(err, books) {
      if(err) throw err;
      res.send(books);
    });
  });

  app.get('/api/my/books', function(req, res) {
    Book.find({ownedBy: req.user._id}, function(err, books) {
      if(err) throw err;
      res.send(books);
    });
  })

  app.route('/api/book/search')
    .post(function(req, res) {
      var options = {
        host: 'www.goodreads.com',
        path: '/search/index.xml?key=8ge6l7EXvLgEKPjEMwLxnw&q=' + encodeURIComponent(req.body.query)
      }

      var cb = function(response) {
        var str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function() {
          parseString(str, {explicitArray: false}, function(err, result) {
            // console.log(result.GoodreadsResponse.search.results);
            var parsedResult = result.GoodreadsResponse.search.results.work.map(function(each) {
              return {
                _id: each.best_book.id._,
                title: each.best_book.title,
                author: each.best_book.author.name,
                rating: each.average_rating,
                imageUrl: each.best_book.image_url
              };
            });

            res.send(parsedResult);
          });
        })
      }

      http.request(options, cb).end();
    })


  // authentication with google routes
  app.route('/auth/google')
    .get(passport.authenticate('google', {scope: ['email']}));

  app.route('/auth/google/callback')
    .get(passport.authenticate('google'), function(req, res) {

      res.redirect('/#/wall');
    });

  app.route('/auth/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    })
}