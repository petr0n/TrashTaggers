const express = require('express');
const router = express.Router();
const passport = require("passport");

let db = require("../models/");

// GET /auth/google
// router.get('/auth/google',
// 	passport.authenticate('google', { 
// 		scope: [
// 			'https://www.googleapis.com/auth/userinfo.profile',
// 			'https://www.googleapis.com/auth/userinfo.email'
// 		] 
// 	})
// );

router.get('/auth/google', (req, res, next) => {
	let state = req.query;
	const authenticator = passport.authenticate('google', { 
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		], 
		state 
	})
	authenticator(req, res, next);
});  

router.get('/auth/google/join', 
  passport.authenticate('google', { 
		// successRedirect : '/?success=1',
		failureRedirect: '/error',
		session: true 
	}),
	(req, res) => {
		//	console.log('wooo we authenticated, here is our user object:', req.user);
		// res.json(req.user);
		// req.session.fullName = req.user.fullName;
		// req.session.email = req.user.email;
		console.log('callback req.query: ', req.query);
		res.redirect('/?loggedIn=true');
	}
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
