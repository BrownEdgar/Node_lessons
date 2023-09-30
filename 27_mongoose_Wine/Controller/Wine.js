const mongoose = require("mongoose");

class WineController {
	// ------------------------------------------
	async getAllWines(req, res) {
		try {
			//getAllWines-ը նկատի ունեք "․․/sevices/Wine.js"-ում
			//"class"-ի մեջ հայտարարած համապատասղան ֆունկցիան
			//req.app.services.wines -ը հասնում է մեզ "app"-իցա
			let addWines = await req.app.services.wines.getAllWines(res);
			res.status(200).send(addWines);
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	// ------------------------------------------
	async addSingleWine(req, res) {

		try {
			let singleWine = await req.app.services.wines.addSingleWine(res, req.body);
			res.status(200).send(singleWine);
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	// ------------------------------------------
	async getWineByName(req, res) {
		
		let { winename } = req.params;
		console.log('winename', winename)
		try {
			let wname = await req.app.services.wines.getWineByName(res, winename );
			res.status(200).json({ message: wname });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	// ------------------------------------------

	async getWinesByMultipleFields(req, res) {
		console.log('getWinesByMultipleFields')
		console.log('req.params', req.headers)
		const { winename, price } = req.headers
		try {
			let response = await req.app.services.wines.getWinesByMultipleFields(res, winename, price);
			res.status(200).json({ message: response });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	// ------------------------------------------
		async getWineByCompanyName(req, res) {
			const { companyname } = req.params
		try {
			let response = await req.app.services.wines.getWineByCompanyName(res, companyname);
			res.status(200).json({ [`${companyname}-i gininern en`]: response });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	// ------------------------------------------
	async getMostExpensiveWine(req, res) {
		try {
			let response = await req.app.services.wines.getMostExpensiveWine(res);
			res.status(200).json({ message: response });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	// ------------------------------------------
	async priceIncrease(req, res) {
		const { sum } = req.params
		try {
			let response = await req.app.services.wines.priceIncrease(res, sum);
			res.status(200).json({ message: response });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
		// ------------------------------------------
	async randomWine(req, res) {
		try {
			let response = await req.app.services.wines.randomWine(res);
			res.status(200).json({ message: response });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	// ------------------------------------------
	isLogin(req, res, next) {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(401).json({
			message: 'Token not Provided !'
		})
	}
	const token = authHeader.replace('Bearer ', '');
	try {
		const payload = jwt.verify(token, process.env.SESSION_SECRET);
		if (payload.type !== 'access') {
			return res.status(401).json({
				message: 'Token expired'
			})	
		}
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				message: 'Token expired'
			})
		}
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				message: `invalid Token`
			})
		}
	}
	next();
}

}

module.exports = WineController;