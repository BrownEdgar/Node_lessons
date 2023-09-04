const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Joi = require('joi');
app.use(express.json());



const schema = Joi.object({
	username: Joi.string().empty('').default('abcd'),

	age: Joi.number().integer().min(18).max(63).required()
})
app.get('/', (req, res) => {
	res.json({
		message: 'home page'
	})
})
app.get('/users', (req, res) => {
	res.json({
		message: 'users page'
	})
})

app.post('/users', (req, res) => {
	const { body } = req;

	try {
		const result = schema.validate(body)
		console.log('result:', result)
		if (result.error) {
			throw result.error
		}
		res.json({
			message: "users successfuly saved!"
		})
		 

	} catch (error) {
		console.log("-------", error)
		res.json({ error:error.message })
	}
})

app.listen(3003, () => console.log('server is running'))