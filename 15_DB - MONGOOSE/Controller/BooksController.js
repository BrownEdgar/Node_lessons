class BooksController {
  constructor(models) {
    this.models = models
  }

  async getAllBooks(req, res) {
    console.log(req.app.sericies.books)
    try {
      let allBooks = await req.app.sericies.books.getAllBooks(res)
      res.status(201).send(allBooks)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  async createNewOneBook(req, res) {
    try {
      let newBook = await req.app.sericies.books.createNewOneBook(res, req.body, req.file.path)
      res.status(201).send(newBook)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}

module.exports = BooksController
