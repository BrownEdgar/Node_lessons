const express = require('express')
const app = express()
const port = 3000
const passportSetup = require("./config/passport-setup");

app.set("view engine", "ejs")
app.get('/', (req, res) => {
	res.render('home')
})
const authRouter = require("./routes/auth-routes");


app.use("/auth", authRouter);
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
