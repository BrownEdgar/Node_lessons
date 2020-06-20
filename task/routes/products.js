const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const mongoose = require("mongoose");
const path = require('path');
const multer = require("multer");