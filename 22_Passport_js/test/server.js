const express = require('express');
const passport = require('passport');
var cors = require('cors')
const cookieSession = require('cookie-session');
const app = express();
const port = 3000;


require('./passport-config2')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
	name: 'pass-session',
	keys: ['key1', 'key2']
}))


app.get('/', (req, res) => {
	res.send('Duq der mutq cheq gorcel!')
})
app.get('/failed', (req, res) => {
	res.send('Login Error')
})
app.get('/success', isLogin, (req, res) => {
	console.log(`success`, req)
	res.send(`hello ${req.session.user.displayName}!`)
})


app.get('/auth/google', passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/auth/google/redirect',
	passport.authenticate('google', {
		failureRedirect: '/failed',   
	}),
	function (req, res) {
		req.session.user = req.user; 
		res.redirect('/success');
	});


	function isLogin(req,res,next) {
		console.log("req.session.user ------------------> ", req.session.user);
		req.session.user ? next() : res.sendStatus(401);
	}

app.get('/logout', (req, res) => {
	req.session = null;
	req.logOut();
	res.redirect('/')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})


function foo(num) {
	return 3 - num 
}