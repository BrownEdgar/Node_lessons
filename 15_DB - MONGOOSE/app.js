/////////////////////////////////////////////////////////////////////////////////
//Mongoose - это ODM (* Object Document Mapper - объектно-документный отобразитель).
//Սա նշանակում է, որ Mongoose-ը թույլ է տալիս սահմանել օբյեկտները խիստ տիպայնացված սխեմայով, որոնք համապատասխանում են MongoDB մոդելին:
// Հնարավոր տիպերն են․․․ 
//String | Number | Date | Buffer | Boolean | Mixed | ObjectId + _id key | Array |
//  Number և Date տիպերի համար կարելի է սահմանաել min max արժեքներ

/////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");


const models = require('./models')
const sericies = require('./Servicies')

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//IMport Routes
// const postsRouter = require('./routes/posts');
// const usersRouter = require('./routes/users');
// const clients = require('./routes/testRoute');
// const bookRouter = require("./routes/bookRouter")
const ROUTERS = require("./routes")

app.use('/posts', ROUTERS.Post);
app.use('/users', ROUTERS.UserRouter);
app.use('/clients', ROUTERS.Client);
app.use('/book', ROUTERS.BookRouter);


app.models = {
  books: models.Book
}

app.sericies = {
  books: new (sericies.books)(app.models)
}

// 'mongodb://localhost:27017/FirstDB'
mongoose.connect(
  'mongodb://localhost:27017/klaus',

  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Coneccted to DB")
  });


app.get('/', function (req, res) {
  res.send("Home Page...");
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});