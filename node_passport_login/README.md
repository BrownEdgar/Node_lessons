# Node.js & Passport Login

This is a user login and registration app using Node.js, Express, Passport, Mongoose, EJS and some other packages.

### Version: 2.0.0

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5000
```

### MongoDB

Open "config/keys.js" and add your MongoDB URI, local or Atlas

### ognox sayt css-i hamar 
https://bootswatch.com/


### Чтобы включить использование нового механизма топологии, используйте следующую строку:
mongoose.set('useUnifiedTopology', true);
В useUnifiedTopology опции удаляет поддержку для нескольких вариантов подключения , которые больше не актуальны с новой топологией двигателя:


PassportJS — это middleware для авторизации под node.js
Зависимости:

«express»: «3.3.7»,
«passport»: "~0.1.17",
«passport-local»: "~0.1.6",
«mongoose»: "~3.8.0",

### example
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password,done){
  User.findOne({ username : username},function(err,user){
    return err 
      ? done(err)
      : user
        ? password === user.password
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' });
  });
}));
###  LocalStrategy
Паспорт использует так называемые стратегии для аутентификации запросов. Стратегии варьируются от проверки username и password:По-умолчанию
LocalStrategy принимает 2 параметра: объект с опциями и middleware для верификации пользователя. 
По-умолчанию, если в `LocalStrategy` не передавать никаких опций — стратегия будет искать параметры для авторизации пользователя в формах с именами `username` и `password`
Если все в порядке, и пользователь существует, то информация о нем сохраняется в сессию, а идентификатор сессии, в свою очередь, сохраняется в cookies браузера.

### serializeUser & deserializeUser
В типичном веб-приложении учетные данные, используемые для аутентификации пользователя, будут передаваться только во время запроса на вход. Если аутентификация успешна, сеанс будет установлен и поддержан через cookie, установленный в браузере пользователя.
Каждый последующй запрос будет содержать cookies, с помощью которого passport сможет опознать пользователя, и достать его данные из сессии. Для того, чтобы сохранять или доставать пользовательские данные из сессии, паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`. 
### example
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user);
  });
});
 ### req.isAuthenticated()
 Проверку авторизации можно делать с помощью req.isAuthenticated(). Я вынесу проверку в middleware


### link 
https://habr.com/ru/post/201206/





### Подключение Passport к Express
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
 
// Passport:
app.use(passport.initialize());
app.use(passport.session());


### flash
это специальная область сеанса, используемая для хранения сообщений. Сообщения записываются на флэш-память и очищаются после отображения пользователю
При наличии flashпромежуточного программного обеспечения все запросы будут иметь 
req.flash() функцию, которую можно использовать для флеш-сообщений
Управление сообщениями осуществляется с помощью метода flash() объекта запроса. Для создания сообщения методу необходимо передать два параметра:

1.ключ, по которому в дальнейшем будет получаться сообщение;
2.текст сообщения.
req.flash('message', { from: 'Me', to: 'You' })
console.log('Flash: ', req.flash('message'))
### example
app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/');
})
app.get('/', function(req, res){
  // Get an array of flash messages by passing the key to req.flash()
  res.render('index', { messages: req.flash('info') });
});

### failureFlash: true 
Перенаправления часто объединяются с флеш-сообщениями для отображения информации о состоянии для пользователя.
Если для параметра faultFlash задано значение true, Passport отправляет сообщение об ошибке, используя сообщение обратного вызова проверки стратегии, если оно есть. Часто это лучший подход, потому что обратный вызов проверки может наиболее точно определить причину неудачной аутентификации.