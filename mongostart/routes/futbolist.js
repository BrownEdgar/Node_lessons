const { Router } = require('express');

const FutbolistModel = require('../models/FutbolistModel');

const router = Router();

router.get('/', (req, res) => {
  FutbolistModel.find({})
    .then((result) => res.status(200).send(result))
    .catch(() => res.status(500).send());
});

router.get('/:id', (req, res) => {
  const _id = req.params.id;
  FutbolistModel.findById({ _id })
    .then((result) => {
      if (!result) {
        return res.status(404).send('no found');
      }
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
});
router.get('/:age/:position', (req, res) => {
  const { age, position } = req.params;
  FutbolistModel.find({ age, position }, { _id: 0 })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.post('/', (req, res) => {
  console.log('sausg', req.body);
  const { name, age, number, position, team } = req.body;
  const newFUtbolist = new FutbolistModel({
    name,
    age,
    number,
    position,
    team,
  });
  newFUtbolist
    .save()
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
