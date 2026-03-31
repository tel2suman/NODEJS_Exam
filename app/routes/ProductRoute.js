
const express = require("express");

const ProductController = require("../controllers/ProductController");

const Upload = require("../utils/CloudinaryImageUpload");

const validateProduct = require("../utils/ProductSchemaValidation");

const router = express.Router();



// product page
router.get("/add/product", ProductController.addProduct);

// create post
router.post(
  "/create/product",
  validateProduct,
  Upload.single("image"),
  ProductController.createProduct,
);

// get all posts
router.get("/product_list", ProductController.getAllProduct);



module.exports = router;