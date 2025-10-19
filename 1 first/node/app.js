require('dotenv').config();
const path = require('path');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pizzaRoutes = require('./routes/pizza');

app.use('/pizza', pizzaRoutes);

app.get('/', (req, res) => {
  res.send('home page');
});

app.listen(port, () => console.log('server is running'));
