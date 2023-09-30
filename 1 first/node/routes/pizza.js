const { Router } 	= require('express');
const router 		= Router();
const fs 			= require('fs');
const Pizza 		= require('../models/TestPizza');
 


router.get("/all", async (req, res) => {
	try {
		const pizzas = await Pizza.getAll();
		res.json({ pizzas })
	} catch (error) {
		console.log(error);
		res.json({ error })	
	}
})


router.post('/add', async (req, res) => {
	
	const { name, price, type, size } = req.body;

	try {
		let newPizza = await new Pizza(name, price, type, size);
		await newPizza.save();
		res.json({ message: "saved!" })
	} catch (error) {
		res.json({ error })
	}
})

router.delete('/deleted/all', async (req, res) => {
console.log("mtav");
	try {
		const pizzas = await Pizza.clear();
		res.json({ pizzas })
	} catch (error) {
		console.log(`error`, error)
		res.json({ error })
	}
})

router.delete('/deleted/:id', async (req, res) => {
	let { id } = req.params;
	
	try {
		const pizzas = await Pizza.getAll();
		let newPizzas = pizzas.filter(elem => elem.id !== id);
		console.log(`newPizzas`, newPizzas)
		let p = await Pizza.replacePizzas(newPizzas)
		res.json({ p })
	} catch (error) {
		console.log(`error`, error)
		res.json({ error })
	}
})




module.exports = router;



