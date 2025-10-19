const path = require('path');

const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const models = require('./models');
const sevices = require('./services');

const app = express();
app.use(expresslayouts);
app.set('layout', './layouts/main');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/css', express.static(`${__dirname}/public/css`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const wineRouter = require('./routes/Wine');
const sevices = require('./services');

app.use('/wine', wineRouter);

app.models = {
  wines: models.wine,
};

app.services = {
  wines: new sevices.wine(app.models),
};

// Use connect method to connect to the server
async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://Edgar:sebastian25@sebocl.bhoqm.mongodb.net/klaus?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    app.listen(3333, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
