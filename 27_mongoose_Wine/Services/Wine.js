const mongoose = require("mongoose");

class WineController {
  constructor(models) {
    this.models = models;
  }
  // ------------------------------------------
  async getAllWines(res) {
    const wines = await this.models.wines.find({})
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
    // const wine = await this.models.wines.aggregate([
    // 	{ $count: "allDocumentsCount" },
    // ])
    // return 	wine
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
  async getWineByName(res, fieldname) {
    // const wine = await this.models.wines.find({ winename }).select("winename prce dom")
    const wine = await this.models.wines.aggregate([
      { $match: { winename: fieldname } },
    ])
    const RESULT = wine.length ? wine : "wine with this name WAS NOR FOUND in the database"
    return RESULT;
  }
  // ------------------------------------------
  async getWinesByMultipleFields(res, winename, price) {
    console.log('{winename, price}', { winename, price })
    const wine = await this.models.wines.aggregate([
      { $match: { $and: [{ winename: winename }, { price: { $gt: +price } }] } },
      // ԿՈՒՂԱՐԿԻ ՄԻԱՅՆ "$project" ՕԲՅԵԿՏՈՒՄ ՆՇՎԱԾ ԴԱՇՏԵՐԸ!
      //_id-ն default գալիսա, դրա համար դնում ենք "0", որ չցուցադրվի
      // { $project: { winename: 1, price: 1, _id: 0} }
    ])
    const RESULT = wine.length ? wine : "wine WAS NOT FOUND in the database :("
    return RESULT;
  }
  // ------------------------------------------
  async getWineByCompanyName(res, companyname) {

    const company = await this.models.wines.aggregate([
      { $match: { 'company.city': companyname } },
      { $project: { winename: 1, price: 1, kind: 1, _id: 0 } },
      { $count: "ginineri qanaky" }, //ՕԲՅԵԿՏՆԵՐԻ ՓՈԽԱՐԵՆ ԿՎԵՐԱԴԱՐՁՆԻ ԳԻՆԻՆԵՐԻ ՔԱՆԱԿԸ
    ])

    return company;
  }
  // ------------------------------------------
  async getMostExpensiveWine(res) {

    const expensiveWine = await this.models.wines.aggregate([
      {
        $group:
        {
          _id: null,
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" }
        }
      },
      { $unset: ["_id"] }// ԱՌԱՆՑ "_id" ԴԱՇՏԻ

    ])
    return expensiveWine;
  }
  // ------------------------------------------
  async priceIncrease(res, sum) {
    const Increase = await this.models.wines.aggregate([
      //ԲՈԼՈՐ ԳԻՆԻՆԵՐԸ ԿԹԱՆԿԱՆԱՆ "sum" ՉԱՓՈՎ
      //ՑՈՒՑԱԴՐՈՒՄ ԵՆՔ ՆԱԵՎ "winename" և "price" ԴԱՇՏԵՐԸ

      { $project: { winename: 1, price: 1, total: { $add: ["$price", +sum] } } }

    ])
    return Increase;
  }
  // ------------------------------------------
  async randomWine(res) {
    const random = await this.models.wines.aggregate([
      { $sample: { size: 1 } },
      { $unset: ["__v"] }
    ])
    return random;
  }
}

module.exports = WineController;