const { Router } = require('express')
const Userschema= require('../models/user')

const router = Router()

router.get('/', async (req, res) => {
	res.render("index");

	
})
router.post("/create", async (req, res) => {
	const { name, surname, age, email} = req.body
	let newUser = new Userschema({
		name, 
		surname,
		age, 
		email
	})
	console.log('newUser', newUser)
	newUser.save();
	res.redirect("/")
})

module.exports = router
