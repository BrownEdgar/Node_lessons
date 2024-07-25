var express = require('express');
var path = require('path');

const mongoose = require('mongoose');


// 	import MODELS AND SERVICES
const models = require("./models");
const sevices = require("./services");

const app = express();


app.use(express.static(path.join(__dirname, 'public')))
app.use('/public/css', express.static(__dirname + '/public/css'));

app.use(express.urlencoded({ extended: true }))

//ROUTES

const agregateRouter = require('./routes/agregateTest');
const booksRouter = require('./routes/books');

app.use("/agregate", agregateRouter);
app.use("/books", booksRouter);


app.models = {
  clients: models.clientInfo,
  books: models.books,
}
app.services = {
  clients: new (sevices.ClientServices)(app.models),
  books: new (sevices.books)(app.models),
};





// Use connect method to connect to the server
async function start() {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/test')
    app.listen(3333, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()

