const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const users = [];
router.post("/", async function (req, res) {
	const {name, password} = req.body;
	let isUserFound = users.some(user => user.name === name)
	if (isUserFound) {
		res.status(400).send("Alredy exist")
	}else{
		try {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			const newUser = { id: users.length, name, password: hashPassword };
			users.push(newUser)
			res.json({ qanak: users.length, result: users })
		} catch (error) {
			console.log(err);
			res.json({error})
		}
		

	}
})

router.post("/login", async function (req, res) {
	const { name, password } = req.body;
	let loginedUser = users.find(user => user.name === name)


	if (loginedUser) {
		let isPasswordValid = await bcrypt.compare(password, loginedUser.password)
		console.log(`isPasswordValid`, isPasswordValid)
		!isPasswordValid ? res.json({message: "invalid password"})
						 : res.json({ message: "welcome" })
	} else {
		res.status(404).json({ message: "user not found" })
	}
})




module.exports = router;