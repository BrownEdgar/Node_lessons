const mongoose = require("mongoose");



class WineController {
	constructor(models) {
		this.models = models;
	}
	// ------------------------------------------
	async getAllWines(res) {
		let wines = await this.models.wines.find({})
		// .select('title description _id');
		if (wines.length < 1) {
			res.status(404).json({
				message: "wines Is not found :("
			})
		}
		return {
			count: wines.length,
			wines
		};
	}

	// ------------------------------------------
	async addSingleWine(res, body) {
		const norwine = new this.models.wines({
			_id: new mongoose.Types.ObjectId(),
			...body
		});
		await norwine.save();
		return norwine;
	}
	// ------------------------------------------
	async getWineByName(res, winename) {
		// const wine = await this.models.wines.find({ winename }).select("winename prce dom")
		const wine = await this.models.wines.aggregate([
			{ $match: { winename } },
		])
		const  RESULT =  wine.length ? wine : "wine with this name WAS NOR FOUND in the database"
		return RESULT;
	}
	// ------------------------------------------
	async getWinesByMultipleFields(res, winename, price) {
console.log('{winename, price}', {winename, price})
		const wine = await this.models.wines.aggregate([
			{ $match: { $and: [{ winename: winename }, { price: { $gt: +price } }] } },
			// ԿՈՒՂԱՐԿԻ ՄԻԱՅՆ "$project" ՕԲՅԵԿՏՈՒՄ ՆՇՎԱԾ ԴԱՇՏԵՐԸ!
			//_id-ն default գալիսա, դրա համար դնում ենք "0", որ չցուցադրվի
			// { $project: { winename: 1, price: 1, _id: 0} }
		])
		const RESULT = wine.length ? wine : "wine WAS NOR FOUND in the database :("
		return RESULT;
	}
}

module.exports = WineController;