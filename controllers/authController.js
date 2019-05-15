const express = require('express');
const router = express.Router();
const passport = require("passport");

let db = require("../models/");

router.get('/auth/google', (req, res, next) => {

	//console.log('req.query: ', req.query);
	// put any url params into the session
	req.session.actions = req.query;

	const authenticator = passport.authenticate('google', { 
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	})
	authenticator(req, res, next);
});  

router.get('/auth/google/join', 
  passport.authenticate('google', { 
		failureRedirect: '/error',
		session: true 
	}),
	(req, res) => {
		// console.log('callback req.query: ', req.query);
		console.log('req.session.actions: ', req.session.actions.eventId);
		let loginUrl = '/?loggedIn=true';
		if (req.session.actions) {
			if (req.session.actions.action === 'join') {
				loginUrl = '/event/' + req.session.actions.eventId + '?joined=1';
			} else {
				loginUrl = '/createEvent/?loggedIn=1';
			}
		}
		res.redirect(loginUrl);
	}
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
