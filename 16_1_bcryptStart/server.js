// //////////////////////////////////////////////////////////////////
// bcrypt.
// /////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json())
const users = []

app.get('/users', function (req, res) {
	res.send(users);
});
//bcrypt աշխատում է "async" ֆունկցիաներում
app.post('/users', async function (req, res) {
	try{
		//const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(req.body.password,10)
		//console.log('salt', salt)
		console.log('hashPassword', hashPassword)

		const user = {
			name: req.body.name,
			password: hashPassword
		}
		users.push(user)
		res.status(201).send(users);
	}catch{
		res.status(500).send("some err");

	}
});

app.post('/users/login', async function (req, res) {
	const user = users.find(user => user.name === req.body.name );
	console.log('user', user)
	if (user === undefined) {
		return res.status(400).send("User-y gtnvac che")
	}
	try {
		const check = await bcrypt.compare(req.body.password, user.password)
		if (check){
			 res.status(200).send("success");
		}else{
			res.status(404).send("login error");
		}
	} catch{
		res.status(500).send();
	}
	res.end(users);
});
app.listen(3000 ,()=>console.log('server is running'))



