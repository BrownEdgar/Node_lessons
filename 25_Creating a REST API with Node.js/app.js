const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
// կարևոր տող
app.use('/uploads', express.static('uploads'));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT', 'GET', 'PATCH', 'DELETE', 'POST');
    res.status(200).json({});
  }
  next(); // partadir
});
mongoose.connect(
  'mongodb://localhost:27017/Maximilean',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => console.log(err)
);
const ordersRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/User');

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.use((_req, res, next) => {
  const error = new Error('not found');
  error.status = 404; // error.status(404) chi lini;
  next(error);
});

app.use((error, _req, res) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
// const fileupload = require("express-fileupload");
// app.use(fileupload());
