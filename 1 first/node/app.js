require('dotenv').config();
const express = require('express')
const path = require('path')
const app = express();
let port =  process.env.PORT || 3000


app.use(express.json());


const pizzaRoutes = require('./routes/pizza');

app.use('/pizza', pizzaRoutes)


app.get("/", function (req, res) {
	res.send("home page")
})

app.listen(port, ()=> console.log("server is running"));