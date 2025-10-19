const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

/* GET orders page. */
router.get('/', (req, res, next) => {
  Order.find()
    .select('product quantity _id') // yntrum enq cucadrvox dashtery aranc "_v" dashti, _id dashty chi kara chlini
    .populate('product', 'name')
    .exec()
    .then((docs) => {
      const allOrders = {
        count: docs.length,
        orders: docs.map((doc) => ({
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: 'GET',
            url: `http://localhost:3005/orders/${doc._id}`,
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
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: req.body.quantity,
  });
  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          message: 'Order is sorted',
          type: 'GET',
          url: `http://localhost:3005/orders/${result._id}`,
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
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .populate('product')
    .select('product quantity _id')
    .exec()
    .then((order) => {
      if (!order) {
        // ete ordr-y chi gtnvel
        return res.status(404).json({
          message: 'order not found',
        });
      }
      res.status(200).json({
        order,
        request: {
          type: 'GET',
          url: 'http://localhost:3005/orders',
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
router.delete('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  Order.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(201).json({
        message: 'order Deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3005/orders/',
          body: {
            productId: 'ID',
            quantity: 'Number',
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
