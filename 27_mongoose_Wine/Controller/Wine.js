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
		console.log("mtav")
		let {winename} = req.params;
		console.log('winename', winename)
		try {
			let wname = await req.app.services.wines.getWineByName(res, winename );
			res.status(200).json({ message: wname });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	async getWinesByMultipleFields(req, res) {
		console.log('req.params', req.headers)
		const { winename, price } = req.headers
		try {
			let response = await req.app.services.wines.getWinesByMultipleFields(res, winename, price);
			res.status(200).json({ message: response });
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
}

module.exports = WineController;