const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Order = require('../models/order');


router.get('/', function(req, res, next){
    Order.find()
    .select("product quantity _id")
    .populate('product',"name")
    .exec()
    .then((data)=>{
        const allOrders ={
          count:data.length,
          orders: data.map((doc)=>{
              return {
                  _id: doc._id,
                  product:doc.product,
                  quantity:doc.quantity,
                  request: {
                      methods: "GET",
                      url: "http://localhost:3005/orders/" + doc._id
                  } 
              }
          })  
        }
        res.status(201).json(allOrders)
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
    });
})