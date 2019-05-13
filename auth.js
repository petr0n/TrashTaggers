const GoogleStrategy = require('passport-google-oauth2').Strategy;
let db = require("./models/");
require("dotenv").config();


module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		// console.log('serializeUser user:', user);
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		db.User.findById(id).then(user => {
			// console.log('deserializeUser id:', id);
			return done(null, user);
		});
	});

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENTID,
		clientSecret: process.env.GOOGLE_CLIENTSECRET,
		callbackURL: process.env.GOOGLE_CALLBACKURL
	},
		function (accessToken, refreshToken, profile, done) {
			// console.log('profile', profile);
			db.User.findOrCreate({
				where: {
					googleIdToken: profile.id
				},
				defaults: {
					googleIdToken: profile.id,
					fullName: profile.displayName,
					email: profile.emails[0].value
				}
			}).spread(user => {
				// console.log('findorCreate user: ', user);
				done(null, user);
			}).catch(err => done(err, false))
		}
	));

}