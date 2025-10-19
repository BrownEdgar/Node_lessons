const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');

/* GET orders page. */
router.get('/', (req, res, next) => {
  User.find()
    .populate({ path: 'product', select: 'name price' })
    .populate('order', 'quantity')
    .exec()
    .then((docs) => {
      const allOrders = {
        count: docs.length,
        orders: docs.map((doc) => ({
          sepakan: doc.sepakan,
          product: doc.product,
          order: doc.order,
          request: {
            type: 'GET',
            url: `http://localhost:3005/user/${doc._id}`,
          },
        })),
      };
      res.status(201).json(allOrders);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', (req, res, next) => {
  const user = new User({
    sepakan: req.body.sepakan,
    product: req.body.productId,
    order: req.body.orderId,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        createdUser: {
          sepakan: result.sepakan,
          product: result.productId,
          order: result.orderId,
        },
        request: {
          message: 'User is sorted',
          type: 'GET',
          url: `http://localhost:3005/user/${result._id}`,
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
