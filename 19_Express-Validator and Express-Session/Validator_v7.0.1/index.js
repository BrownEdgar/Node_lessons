const express = require('express');
const { query, validationResult, body } = require('express-validator');
const app = express();

app.use(express.json());

const createEmailChain = () => body('email').isEmail();
app.get('/hello', query('person').notEmpty(), createEmailChain(), (req, res) => {

	const result = validationResult(req);

	if (result.isEmpty()) {
		return res.send(`result, ${JSON.stringify(result,null,1)}`);
	}

	res.send({ errors: result.array() });
})

app.get('/cookie', (req,res) => {
	console.log("Cookies:", req.headers['cookie']);
	/*Ուղարկում է միայն 1 cookie*/
	res.setHeader('Set-cookie', "Test1=test2");

	// /*Ուղարկում է շատ cookie-ր*/
	// res.setHeader('Set-cookie', ["item2=value2", "item3=value3", "email=example@mial.com"]);
	console.log("Method getCookie():", res.getHeader('Set-cookie'));
	res.json({cookie: res.getHeader('Set-cookie')})
	
})
app.get('/test', (req, res) => {
	console.log("Cookies:", req.headers['cookie']);
	res.send('ok')
})


app.listen(3000);