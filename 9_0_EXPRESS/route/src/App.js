const express = require('express');
const app = express()
const port = 8080;
app.use(express.json())



const login = require('./routes/Login')
const register = require('./routes/Register')

app.use("/login", login)
app.use("/register", register)


app.get("/",function (req,res) {
	res.send("home page")
})




app.listen(port, () => console.log("running"))