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

}

module.exports = ClientController;