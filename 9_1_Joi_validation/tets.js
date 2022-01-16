const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Joi = require('joi');
app.use(express.json());

const users = [];
// const obj = {
// 	"name":
// 	"surname":
// 	"age":
// 	"email":
// 	"password":
// 	"salary":
// 	"hobbies":
// 	"address":
// "dob":

// }

app.get('/users', (req,res)=> {
	res.send(users)
})
app.post('/users', async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().empty('').default('default name here'),
		surname: Joi.string().required(),
		gender: Joi.string().valid('male', 'fimale').required(),
		age: Joi.number().min(18).max(98),
		email: Joi.string().email(),
		// Մինիմում 1 Մեծատառ + 1 Փոքրատառ + 1 թիվ 
		password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
		repeat_password: Joi.ref('password'),
		salary: Joi.number().greater(50000).required(),
		hobbies: Joi.array().items(Joi.string()).length(3).required(),
		dob: Joi.date().greater('1-1-1974').default("19-09-1986")

	});
	try {
		let result =  schema.validate(req.body);

		if (result.error) {
			throw result.error.details[0].message
		}

		const { password } = req.body;
		const hashPasssword = await bcrypt.hash(password, 10);
		console.log({ body:req.body})
		let newUser = {
			...result.value, //req.body վար գրենք "default" արժեքները չեն պահպանվի
			password: hashPasssword,
		}
		users.push(newUser);
		res.send(users);
	} catch (error) {
		res.status(500).json({error});
	}

})

app.post('/users/login', async (req, res) => {

	const { name, password } = req.body;


	console.log({ name, password } );
	let user = users.find(elem => elem.name === name);
	if (user === undefined) {
		res.status(404).send("User not Found!")
	}else{
		try {
			let check = await bcrypt.compare(password, user.password);
			if (check) {
				res.send(`Welcome ${user.name} jan!`)
			} else {
				res.send(`login faild`)
			}
		} catch (error) {
			res.status(500).send();
		}
		
	}
})
app.listen(3000, () => console.log('server is running'))