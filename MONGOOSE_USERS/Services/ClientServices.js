const mongoose = require("mongoose");
const { getdata } = require('../helpers/getData');
const Clients = require("../models")


class ClientController {
	constructor(models) {
		this.models = models;
	}

	async addClients(res) {
	
		let users = await Clients.userInfo.insertMany(await getdata())

		console.log(users)
		return users;
	}

	async getAllClients(res) {

		const allClients = this.models.clients.aggregate([
			{ $match: { } },
			{ $group: { _id: '$name' } },
		
		])
		console.log("allClients:", allClients)
		return allClients;
	}

}

module.exports = ClientController;