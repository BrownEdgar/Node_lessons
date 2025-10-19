const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

// Use connect method to connect to the server
async function start() {
  try {
    mongoose.connect(
      'mongodb+srv://Edgar:sebastian25@sebocl.bhoqm.mongodb.net/klaus?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(3333, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
