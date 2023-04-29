const router = require('express').Router();
const passport = require("passport");

// auth login
router.get('/login', (req, res) => {
	console.log(`req.user`, req.user)
	res.render('login', { user: req.user });
});

// auth logout
router.get('/faild', (req, res) => {

	res.send('logging out');
	req.logOut()

});

router.get('/google/redirect', passport.authenticate('google', {scope:["profile"]}))
router.get('/google/redirect', passport.authenticate('google', {
	failureRedirect:"/auth/faild",
	successRedirect: "/"
}), function (req,res) 	{
	res.redirect("/auth/login")
	
});



module.exports = router;


