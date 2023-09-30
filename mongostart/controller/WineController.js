const mongoose = require('mongoose');

class WineController  {
// ---------------------------
	async getAllWines (req,res){
		try {
			let response = await req.app.services.wines.getAllWines(res);
			res.status(200).send(response)
		} catch (error) {
			res.status(500).send(error.message)
		}
	}
	// ---------------------------
	async addSingleWine(req, res) {
		try {
			let response = await req.app.services.wines.addSingleWine(res, req.body);
			res.status(200).send(response)
		} catch (error) {
			res.status(500).send(error.message)
		}
	}

	async getWineByName(req,res){
		const { winename } = req.params;
		try {
			let response = await req.app.services.wines.getWineByName(res, winename);
			res.status(200).send(response)
		} catch (error) {
			res.status(500).send(error.message)
		}
	}
	async tank(req, res) {
		const { winename, sum } = req.params;
		try {
			let response = await req.app.services.wines.tank(res, winename,sum);
			res.status(200).send(response)
		} catch (error) {
			res.status(500).send(error.message)
		}

	}
}
module.exports = WineController;