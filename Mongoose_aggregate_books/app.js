const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

// 	import MODELS AND SERVICES
const models = require('./models');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/css', express.static(path.join(__dirname, 'public/css')));

app.use(express.urlencoded({ extended: true }));

const agregateRouter = require('./routes/agregateTest');
const booksRouter = require('./routes/books');
const Services = require('./Services');

app.use('/agregate', agregateRouter);
app.use('/books', booksRouter);

app.models = {
  clients: models.clientInfo,
  books: models.books,
};
app.services = {
  clients: new Services.ClientServices(app.models),
  books: new Services.BooksService(app.models),
};

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://sebastian:sebastian25@cluster0.ylctqet.mongodb.net/main-db'
    );
    app.listen(3333, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
