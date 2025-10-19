const express = require('express');

const router = express.Router();
const Post = require('../models/Notes');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ $or: [{ deletedAt: { $eq: null } }] });
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', (req, res) => {
  const post = new Post({
    note: req.body.note,
    discription: req.body.discription,
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({
      message: 'cant find Notes INVALID ID',
    });
  }
});

// Update Notes
router.put('/:id', (req, res, next) => {
  console.log('node body', req.body);
  const noteid = req.params.id;
  Post.updateOne(
    { _id: noteid },
    {
      $set: {
        note: req.body.note,
        updateAt: Date.now(),
      },
    }
  )
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err) => res.send(`Notes with '${err.value}' id's is INVALID try again`));
});

// deleted Notes
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  Post.updateOne({ _id: id }, { $set: { deletedAt: Date.now() } })
    .then((data) => {
      res.json({
        delItemsId: id,
        Notes: data,
      });
    })
    .catch((err) =>
      res.json({
        message: `Can't deleting Notes by '${id}' id's `,
        message2: 'ID is not Faund!',
      })
    );
});
module.exports = router;
