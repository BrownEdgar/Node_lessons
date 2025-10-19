const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// IMport Routes
const authRoute = require('./routes/auth');
const notesRouter = require('./routes/posts');
routerLogValidation = require('./routes/login');

app.use('/posts', notesRouter);
app.use('/user', authRoute);
app.use('/login', routerLogValidation);

mongoose.connect(
  'mongodb://localhost:27017/Notesdb',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => console.log(err)
);

app.get('/', (req, res) => {
  res.send('Home Page...');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
