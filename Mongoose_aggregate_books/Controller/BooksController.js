class BooksController {
  async getAll(req, res) {
    try {
      const books = await req.app.services.books.getAll();
      res.status(200).send(books);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = BooksController;
