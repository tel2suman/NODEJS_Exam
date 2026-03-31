const express = require("express");

const router = express.Router();

//defining routes
const productRoute = require('./ProductRoute');

const categoryRoute = require("./CategoryRoute");

router.use(productRoute);

router.use(categoryRoute);

module.exports = router;