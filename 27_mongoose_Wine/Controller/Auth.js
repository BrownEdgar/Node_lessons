const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

class AuthController {
	// ------------------------------------------
	async register(req, res) {
		// console.log('req.app.services', req.app.services)
		try {
			let newUser = await req.app.services.user.register(res, req.body);
			res.status(200).send(newUser);
		} catch (err) {
			res.status(500).send(err);
		}
	};

	async isLogin(req, res, next) {
		try {
			const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
			
				// Այստեղ հետ ենք կոդավորում մեր "տվյալները"
			// jwt.verify փոխանցում ենք req.headers-ից "token"-ը և գաղտնաբառը
			const decoded = jwt.verify(`${token}`, process.env.SESSION_SECRET);
			
			if (!decoded) {
				return res.status(401).json({
					message: 'jwt token Error',
				});
			} else {
				req.userData = decoded;
			}
			next();
		} catch (error) {
			return res.status(401).json({
				message: `something is wrong Please check req.headers.authorization-${req.headers.authorization.slice(0,15)}`,
				error: error,
				
			});
		}
	};

// ------------------------------------------
async login(req, res) {
	// console.log('req.app.services', req.app.services)
	try {
		let newUser = await req.app.services.user.login(res, req.body);
		res.status(200).send(newUser);
	} catch (err) {
		res.status(500).send(err);
	}
}

}

module.exports = AuthController;