const mongoose = require('mongoose');

const { ErrorMessages } = require('../helpers/Errors');

class ProductServices {
  constructor(models) {
    this.models = models;
  }

  async allproducts(res) {
    const products = await this.models.products.find({});
    if (products.length === 0) {
      res.status(404).send(ErrorMessages.NOT_FOUND_ERROR);
    }
    return products;
  }

  async getProductsByType(res, type) {
    const result = await this.models.products.aggregate([{ $match: { type } }]);
    return result.length ? { message: ErrorMessages.TYPE_ERROR } : result;
  }

  async getProductShoptById(res, id) {
    const specialProduct = await this.models.products.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $project: { name: 1, price: 1, _id: 0 } },
    ]);
    return specialProduct.length
      ? specialProduct
      : res.status(404).send(ErrorMessages.ID_NOT_FOUND_ERROR);
  }

  async addproduct(res, body, file) {
    const newProduct = await this.models.products({
      ...body,
      productImage: file.path,
    });
    await newProduct.save();
    return newProduct;
  }

  async updateAllProduct(_res, body, id) {
    const newProduct = await this.models.products.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: body }
    );

    console.log(newProduct);
    return newProduct;
  }

  async updateProductField(_req, _res) {
    // TODO: Implement updateProductField
  }

  async deleteProduct(_req, _res) {
    // TODO: Implement deleteProduct
  }
}

module.exports = ProductServices;
