module.exports = function(db) {
  var request = require('request');
  var searches = db.collection('searches');

  this.newSearch = function(req, res) {
    var endpoint = 'https://api.imgur.com/3/gallery/search/';
    if(req.query.offset) {
      endpoint += req.query.offset;
    }

    searches.insert({query: req.params.query, date: Date.now()}, function(err, result) {
      if(err) throw err;
      return;
    });

    request({
      method: 'GET',
      url: endpoint + '?q=' + req.params.query,
      headers: {
        'Authorization': 'Client-ID ' + process.env.IMGUR_ID
      }
    }, function(error, response, body) {

      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);

        var filteredInfo = info.data.map(function(each) {
          return {
            alt_text: each.title,
            page_url: 'http://i.imgur.com/' + each.id,
            link_url: each.link
          };
        });

        res.send(filteredInfo);
      }

    });
  }

  this.recent = function(req, res) {
    searches.find().limit(10).sort({date: -1}).toArray(function(err, results) {
      if(err) throw err;

      res.send(results);
    })
  }
}