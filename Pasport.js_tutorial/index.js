const express 		= require('express');
const app 			= express();
const port 			= 3000;
const passportSetup = require("./config/passport-setup");
const mongoose 		= require("mongoose");
const keys 			= require("./config/keys");
app.set("view engine", "ejs")



mongoose.connect(keys.mongodb.dbURI, {
	useNewUrlParser: true,
	useFindAndModify: false,
}, () =>{
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
