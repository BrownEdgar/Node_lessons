const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Product = require('../models/Products');

const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Այստեղ նշում ենք պապկի անունը(հասցեն)
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    // Այստեղ նշում ենք Ֆայլլի անունը  անունը
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* GET home page. */
router.get('/', (req, res, next) => {
  Product.find()
    .select('name price productImage _id') // yntrum enq cucadrvox dashtery aranc "_v" dashti, _id dashty chi kara chlini
    .exec()
    .then((docs) => {
      const allproduct = {
        count: docs.length,
        products: docs.map((doc) => ({
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          productImage: doc.productImage,
          request: {
            type: 'GET',
            url: `http://localhost:3005/products/${doc._id}`,
          },
        })),
      };
      res.status(201).json(allproduct);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// name = "productImage" input պետքա լինի էջում կամ postman => body => form
router.post('/', upload.single('productImage'), (req, res, next) => {
  console.log('req.file', req.file);
  console.log('req.file.path', req.file.path); // uploads\test1.jpg
  console.log('req.file.path', req.body.name);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created product successfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          productImage: req.file.path,
          _id: result._id,
          request: {
            type: 'GET',
            url: `http://localhost:3005/products/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price  productImage _id')
    .exec()
    .then((doc) => {
      console.log('From DB: ', doc);
      if (doc) {
        res.status(200).json({ doc });
      } else {
        res.status(404).json({
          message: 'no valid ID',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update(
    {
      _id: id,
    },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((res) => {
      console.log(res);
      res.status(200).json(res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(201).json({
        message: 'product Deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3005/products/',
          body: {
            name: 'String',
            price: 'Number',
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;

// https://www.youtube.com/watch?v=srPXMt1Q0nY video
