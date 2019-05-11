const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require("dotenv").config();

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
			done(null, user);
	});
	passport.deserializeUser((user, done) => {
			done(null, user);
	});

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENTID,
		clientSecret: process.env.GOOGLE_CLIENTSECRET,
		callbackURL: "https://trashtaggers.herokuapp.com/auth/google/join"
	},
		function (accessToken, refreshToken, profile, done) {
			// console.log('profile', profile.displayName, profile.emails[0].value);
			db.User.findOrCreate({
				where: {
					googleIdToken: profile.id
				},
				defaults: {
					googleIdToken: profile.id,
					fullName: profile.displayName,
					email: profile.emails[0].value
				}
			}).then(function (user) {
				// console.log('findorCreate user: ', user);
				return done(user);
			});
		}
	));

	function done(user) {
		console.log('user.fullName', user.fullName);
	}
}