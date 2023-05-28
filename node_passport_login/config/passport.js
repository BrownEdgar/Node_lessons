/////////////////////////////////////////////
// 1.LocalStrategy принимает 2 параметра: объект с опциями и middleware для верификации пользователя.
// Второй аргумент — middleware — принимает параметры`username`, `passport` и`done`.В done, вторым аргументом, передаем объект пользователя, если такой есть.
 //❗️ Если все в порядке, и пользователь существует, то информация о нем сохраняется в сессию, а идентификатор сессии, в свою очередь, сохраняется в cookies браузера.
 //❗️ Каждый последующй запрос будет содержать cookies, с помощью которого passport сможет опознать пользователя, и достать его данные из сессии. Для того, чтобы сохранять или доставать пользовательские данные из сессии, паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`.
/////////////////////////////////////////////


const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
	console.log('passport:', passport)
	passport.use(new LocalStrategy({
		usernameField: 'email'
	}, (email, password, done) => {
		// Համընկնում user
		User
			.findOne({ email: email })
			.then(user => {
				if (!user) {
					return done(null, false, { message: 'That email is not registered' });
				}

				// Համընկնում password
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err)
						throw err;
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Password incorrect' });
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
