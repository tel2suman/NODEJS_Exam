const express = require("express");

const router = express.Router();

//defining routes
const productRoute = require('./ProductRoute');

router.use(productRoute);

module.exports = router;