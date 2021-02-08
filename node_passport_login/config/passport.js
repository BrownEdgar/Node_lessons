const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        // Համընկնում user
        User
            .findOne({email: email})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'That email is not registered'});
                }

                // Համընկնում password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) 
                        throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                });
            });
    }));
    // serializeUser որոշում է թե, User-օբյեկտի որ տվյալները պետք է պահպանվեն
    // Session-ի մեջ
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
	//passport.deserializeUser առաջին արգումենտը serializeUser-ում done ֆունկցիային փողանցած 2-րդ արգումենտն է։
 	passport.deserializeUser(function (id, done) {
        User
            .findById(id, function (err, user) {
                done(err, user);
            });
    });
};
