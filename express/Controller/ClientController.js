const mongoose = require("mongoose");

class ClientController {

	async addClients(req, res) {

		try {
			//addClients-ը նկատի ունեք "․․/sevices/ClientServices.js"-ում 
			//"class"-ի մեջ հայտարարած համապատասղան ֆունկցիան
			//req.app.services.clients -ը հասնում է մեզ "app"-իցա
			let addClient = await req.app.services.clients.addClients(res, req.body);
			res.status(200).send(addClient);
		} catch (err) {
			res.status(500).send(err.message);
		}
	};

}

module.exports = ClientController;