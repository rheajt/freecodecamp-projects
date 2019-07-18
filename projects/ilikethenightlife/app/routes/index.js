'use strict';

var path = process.cwd();
//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
var yelpHandler = require(path + '/app/controllers/yelpController.server.js');
var GoingTo = require(path +'/app/controllers/goingtoController.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	//var clickHandler = new ClickHandler();
	var goingtoHandler = new GoingTo();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/auth/logout')
		.get(isLoggedIn, function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/auth/profile')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user);
		})
		.put(isLoggedIn, goingtoHandler.setGoingto)
		.delete(isLoggedIn, goingtoHandler.notGoing);

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook'));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/'
		}));

	app.route('/api/yelp')
		.post(function(req, res) {
			yelpHandler(req.body, function(error, response, body) {
				res.send(body);
			});
		});

	app.route('/api/friends')
		.get(isLoggedIn, goingtoHandler.friends);

};
