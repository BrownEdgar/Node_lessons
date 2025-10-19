const express = require('express');

const app = express();
const expbs = require('express-handlebars');

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

const obj = [
  { id: 1, name: 'Armen', age: 18 },
  { id: 2, name: 'Avet', age: 32, regeon: 'Russia' },
  { id: 3, name: 'Karen', age: 22, regeon: 'usa' },
  { id: 4, name: 'hamlet', age: 18, regeon: 'Armenia' },
  { id: 5, name: 'Liana', age: 64, regeon: 'Russia' },
  { id: 6, name: 'Lilith', age: 23, regeon: 'Armenia' },
  { id: 7, name: 'Anahit', age: 16, regeon: 'Russia' },
  { id: 8, name: 'Gayane', age: 10, regeon: 'Denmark' },
  { id: 9, name: 'Axtamar', age: 25, regeon: 'Armenia' },
];

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    name: 'home',
    bool: true,
    users: obj,
  });
});
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = obj.find((user) => user.id === +id);
  console.log(user);

  res.render('users', {
    user: user.name,
    id: user.id,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'About',
    age: user.age || 30,
    description:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sint vero natus soluta fugit, vitae veniam incidunt.',
  });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    isnameValid: true,
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    people: ['Vardan', 'Anahit', 'Levon', 'Hrach'],
    user: {
      userName: 'Sebastian',
      age: 25,
      phone: 77658987,
    },
    lists: [
      {
        items: ['anun', 'Azganun', 'Email'],
      },
      {
        items: ['anun2', 'Azganun2', 'Email2'],
      },
    ],
  });
});

app.get('/task', (req, res) => {
  const r = obj
    .filter((elem) => elem.age >= 18)
    .filter((elem) => {
      if (elem.regeon === 'usa') {
        if (elem.age >= 21) {
          return true;
        }
        return false;
      }
      return true;
    });
  console.log(r);
  res.render('task', {
    data: r,
  });
});
app.listen(8080, () => {
  console.log('Example app listening on port 8080');
});
