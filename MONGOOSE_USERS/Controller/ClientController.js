const mongoose = require("mongoose");

class ClientController {
	async getAllClients(req, res) {

		try {
			let allClients = await req.app.services.clients.getAllClients(res);
			res.status(200).send(allClients);
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	async addClients(req, res) {
		try {
		
			let addClient = await req.app.services.clients.addClients();
			res.status(200).send(addClient);
		} catch (err) {
			res.status(500).send(err.message);
		}
	};
	async getBySpecialField(req, res) {
		const { fieldName } = req.params
		try {

			let addClient = await req.app.services.clients.getBySpecialField(fieldName);
			res.status(200).send(addClient);
		} catch (err) {
			res.status(500).send(err.message);
		}
	};

}

module.exports = ClientController;