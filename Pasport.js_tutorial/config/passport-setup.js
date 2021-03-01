const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require('./keys');
const User = require('../models/User');

passport.use(
	new GoogleStrategy({
		//google start options
		callbackURL:'http://localhost:3000/auth/google/redirect',
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret
	}, (accessToken,refreshTokjen,profile, done) => {
		// passports cb function
			console.log('passports cb function', profile)
		// new User
		let r = new User({
			username: profile.displayName,
			googleId: profile.id
		})
		r.save().then((newUser) => {
			console.log('newUser', newUser)
			.catch(err=>console.log(err));
			done("")
		})  // այս մեթոդը պահում է տվյալները բազայում
	})
)



// link > https://youtu.be/o9e3ex-axzA
// link => https://youtu.be/nK6fkNShhGc?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x