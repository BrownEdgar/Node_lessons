const mongoose = require('mongoose');


class WineController {
	constructor(models){
		this.models = models
	}

	// -------------------------------
	async getAllWines(res){
		let allWines = await this.models.wines.find({})
		return allWines
	}

	// -------------------------------
	async addSingleWine(res, body) {
		let wine = new this.models.wines({
			_id: mongoose.Types.ObjectId(),
			...body
		})
		await wine.save();
		return wine;
	}
	async getWineByName(res,winename){
		let wine = await this.models.wines.aggregate([
			{ $match: { winename }},
			{ $project: { winename: 1, price: 1, _id: 0 }}
		])
		return wine;
	}
	


	
}
module.exports = WineController;