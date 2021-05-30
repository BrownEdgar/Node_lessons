const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID: "975129130799-h9hgh2j4vgbli5l80jibindiqv0irbep.apps.googleusercontent.com",
	clientSecret: "KQXmpcZzgWuOgjtJe0dQC-z8",
	callbackURL: "http://localhost:3000/auth/google/redirect"
},

	function (accessToken, refreshToken, profile, cb) {
		console.log(profile);
		return cb(null, profile);
	}
));