const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { Post } = require('../models');

const router = require("express").Router();
const multer = require('multer');

// multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/')
  },
  filename: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, `photo-${Math.random().toString().slice(12)}` + path.extname(file.originalname))
    } else {
      cb(null, false)
    }
  }
});

const upload = multer({ storage: storage, });


router.get("/", async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json(posts)
})

router.get("/:postid", async (req, res) => {
  const { postid } = req.params;
  try {
    const mid = new mongoose.Types.ObjectId(postid);
    const post = await Post.findOne({ _id: mid }).exec();
    res.status(200).json({
      data: post
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    })
  }

})



router.post("/", [upload.single('img')], async (req, res) => {
  const new_post = await new Post({
    ...req.body,
    img: {
      data: fs.readFileSync("./uploads/images/" + req.file.filename),
      contentType: req.file.mimetype
    }
  });

  await new_post.save()

  res.status(200).json(new_post)
})


module.exports = router