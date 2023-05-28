const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./config/passport-setup");


app.set("view engine", "ejs")

mongoose.connect(keys.mongodb.dbURI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}, () => {
	console.log('MondoDB connect')
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
	res.render('home')
})

const authRouter = require("./routes/auth-routes");

app.use("/auth", authRouter);


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
