const { Router } = require('express')
const bcrypt = require('bcrypt')
const Userschema = require('../models/user')

const router = Router()

router.get('/', async (req, res) => {
console.log('login')
	res.render("login", { layout: "./login", data: {} }); // Եթե չգրելք ելի "Main.ejs" կնկարի
})


router.post('/', async (req, res) => {
	console.log('login run!!!')
	console.log('req.body', req.body);

	const { login, password } = req.body;
	
	Userschema.findOne({ name: login }, { _id:0}, async  (err, user) => {
		if (err) {
			console.log("err",err)
		
		}else{
			console.log('user', user)
			try {
				const check = await bcrypt.compare(password, user.password)
				if (check) {
					console.log('ok')
					res.render("login", { 
						layout: "./login",
						 data: { 
							 isError: false, 
							 message: `Welcome ${user.name}`
							} 
						});
					res.end()
				}else{
					console.log('sxal password');
					res.render("login", {
						layout: "./login",
						 data: {
							isError: true,
							message: `invalid password`
						} });
					res.end();
				}
			} catch {
				console.log('error')
				res.render("login", {
					layout: "./login", 
					data: {
						isError: true,
						message: `Someting is wrong!`
					}});
			}
		}
	}).select('name  password');
})

module.exports = router
