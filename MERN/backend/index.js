const cookieSession = require("cookie-session");
const express = require("express");
const path = require("path");
const cors = require("cors");
const passportSetup = require("./passport");
const mongoose = require('mongoose');
const passport = require("passport");
const logger = require('morgan');

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const app = express();

app.use(
  cookieSession({ name: "session", keys: ["zidan"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(express.static('uploads'));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use('/api', authRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);


mongoose.connect('mongodb://127.0.0.1:27017/main-db')
  .then(() => console.log('Connected!'));

app.listen("3001", () => {
  console.log("Server is running!");
});
