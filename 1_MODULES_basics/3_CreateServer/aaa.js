const express = require('express');

const app = express();

app.use(express.json());
const users = [
  { id: 1, name: 'Karen', age: 24 },
  { id: 2, name: 'Gegham', age: 24 },
  { id: 3, name: 'Edgar', age: 33 },
];

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/users', (req, res) => {
  res.json(users);
});
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((elem) => elem.id === id);
  if (!user) {
    res.status(404).json({ type: 'error', message: 'User is not found!' });
  }
  res.status(200).json({ type: 'Successfily', result: user });
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((elem) => elem.id === id);
  if (!user) {
    res.status(404).json({ type: 'error', message: 'User is not found!' });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(users);
});

app.put('/newusers', (req, res) => {
  users.push(req.body);
  res.send(users);
});
app.get('/users/age/:agelimit', (req, res) => {
  const limit = +req.params.agelimit;
  const f = users.filter((elem) => elem.age <= limit);
  res.json(f);
});

app.put('/updateuser/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const r = users.map((elem) => {
    if (elem.id === id) {
      return req.body;
    }
    return elem;
  });

  res.json({ message: 'user is Updateing!', result: r });
});
app.listen(3000);
