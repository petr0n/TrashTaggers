const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let db = require("./models/");
require("dotenv").config();


module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		// console.log(user);
		done(null, user);
	});
	passport.deserializeUser((userDataFromCookie, done) => {
		done(null, userDataFromCookie);
	});

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENTID,
		clientSecret: process.env.GOOGLE_CLIENTSECRET,
		// callbackURL: "https://trashtaggers.herokuapp.com/auth/google/join"
		callbackURL: process.env.GOOGLE_CALLBACKURL
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
				done(null, user);
			}).catch(done);
		}
	));

}