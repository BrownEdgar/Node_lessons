const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());

const users = [];

app.get('/users', (req,res)=> {
	res.send(users)
})
app.post('/users', async (req, res) => {
	const { name, password } = req.body;
	const hashPasssword = await bcrypt.hash(password,10)
	let newUser = {
		name: name,
		password: hashPasssword,
	}
	users.push(newUser);
	res.send(users);
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