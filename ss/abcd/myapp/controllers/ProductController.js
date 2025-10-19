class ProductServices {
  constructor(models) {
    this.models = models;
  }

  async allproducts(req, res) {
    try {
      const allprdct = await req.app.services.products.allproducts(res);
      res.status(200).send(allprdct);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.PRODUCT_ERROR);
    }
  }

  async getProductsByType(req, res) {
    const { type } = req.params;
    try {
      const typePrdc = await req.app.services.products.getProductsByType(res, type);
      res.status(200).send(typePrdc);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async getProductShoptById(req, res) {
    const { id } = req.params;
    try {
      const result = await req.app.services.products.getProductShoptById(res, id);
      res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async addproduct(req, res) {
    const { body, file } = req;

    try {
      const result = await req.app.services.products.addproduct(res, body, file);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }

  async updateAllProduct(req, res) {
    const { body } = req;
    const { id } = req.params;

    try {
      const result = await req.app.services.products.updateAllProduct(res, body, id);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }

  async updateProductField(_req, _res) {
    // TODO: Implement updateProductField
  }

  async deleteProduct(_req, _res) {
    // TODO: Implement deleteProduct
  }
}

module.exports = ProductServices;
