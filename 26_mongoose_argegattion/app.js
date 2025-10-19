const path = require('path');

const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

// 	import MODELS AND SERVICES
const models = require('./models');
const agregateRouter = require('./routes/agregateTest');
const homeRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sevices = require('./services');

const app = express();
app.use(expresslayouts);
app.use(express.json());
app.set('layout', './layouts/main');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/css', express.static(`${__dirname}/public/css`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/agregate', agregateRouter);

app.models = {
  clients: models.clientInfo,
  users: models.users,
};

app.services = {
  clients: new sevices.ClientServices(app.models),
  users: new sevices.users(app.models),
};

// Use connect method to connect to the server
async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017');
    app.listen(3333, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
