if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
/*_________start*/
const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  password:"",
  define: {
    timestamps: false
  }
});
const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,//значение столбца будет auto
    primaryKey: true,//говорит о том, что соответствующий столбец в таблице будет выполнять роль первичного ключа
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false//допускает ли поле отсутствие значение?
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
sequelize.sync().then(()=>{
  app.listen(4040, function(){
    console.log("Сервер ожидает подключения...");
  });
}).catch(err=>console.log(err));
/*_________start end*/
app.use(bodyParser.urlencoded({ extended: false }));

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))


const users = [];

app.set('view-engine', 'ejs')

app.get('/',  checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/', //ur gna hajoxutyan depqum
  failureRedirect: '/login', //ur gna error-i depqum
  failureFlash: true //gna sxal passvord messigi kam sxal email message-i vra
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
	/*____________start*/
	if(!req.body) return res.sendStatus(400);
         
    const username = req.body.name;
    const useremail = req.body.email;
    User.create({ name: username, email: useremail}).then(()=>{
      res.redirect("/");
    }).catch(err=>console.log(err));
    /*____________end*/
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);//avelacnel
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch (e){
    res.redirect('/register')
  }
})

/*logOut*/
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})


/*tvyalneri pahpanum*/
function checkAuthenticated(req, res, next) {//avelacnel
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {//avelacnel
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


//app.listen(4040,()=>console.log("server start in 4040"));