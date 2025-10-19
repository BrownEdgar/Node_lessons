const mongoose = require('mongoose');

class ClientController {
  constructor(models) {
    this.models = models;
  }

  async addClients(body) {
    // clients-ը այստեղ "app"-իցա գալիս
    const norClient = new this.models.clients({
      _id: new mongoose.Types.ObjectId(),
      ...body,
    });
    await norClient.save();
    return norClient;
  }
}

module.exports = ClientController;
