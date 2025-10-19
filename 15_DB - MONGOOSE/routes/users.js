const express = require('express');

const router = express.Router();
const Client = require('../models/Users');

router.get('/', async (req, res) => {
  try {
    const allUsers = await Client.find();
    res.json(allUsers);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const { name, age, gender } = req.body;
  try {
    const client = await new Client({
      name,
      age,
      gender,
    });
    client
      .save()
      .then((data) => res.json({ message: 'User saved!' }))
      .catch((err) => res.json({ message: err }));

    // Client ստեղծելու ևս մեկ տարբերակ
    // Client.create({ name, age, gender }, function (err, small) {
    // 	if (err)  return res.json({ message: err });
    // 	// saved!
    // 	res.json({ message: "User saved!" })
    // });

    // կամ ՄԻ ՔԱՆԻ "Client/User" ՄԻԱՆԳԱՄԻՑ
    Client.insertMany([{ size: 'small' }], (err) => {
      if (err) {
        return res.json({ message: err });
      }
      // saved!
      res.json({ message: 'User saved!' });
    });
  } catch (error) {
    console.log('chatch block');
    res.json({ message: error.message });
  }
});

module.exports = router;
