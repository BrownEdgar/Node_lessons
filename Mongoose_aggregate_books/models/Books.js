const { Schema, model } = require('mongoose');

const BooksSchema = new Schema({});

module.exports = model('book', BooksSchema);
