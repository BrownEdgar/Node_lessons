const express = require('express');

const app = express();
const bcrypt = require('bcrypt');
const Joi = require('joi');

app.use(express.json());

const users = [];
// const obj = {
// 	"name":
// 	"surname":
// 	"age":
// 	"email":
// 	"password":
// 	"salary":
// 	"hobbies":
// 	"address":
// "dob":
// }

app.get('/users', (req, res) => {
  res.send(users);
});
app.post('/addusers', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    age: Joi.number().min(10).max(80).required(),
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required(),
    repeat_password: Joi.ref('password'),
    salary: Joi.number().min(56000).required(),
    hobbies: Joi.array().items(Joi.string()).length(3).required(),
    dob: Joi.date().greater('1-1-1974').default('19-09-1986'),
  });
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      console.log('result:', result);
      throw result.error.details[0].message;
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      ...result.value,
      password: hashPassword,
    };
    users.push(newUser);
    res.send(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3003, () => console.log('Server is runnig'));
