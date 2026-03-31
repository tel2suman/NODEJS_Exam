
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

// get single post
router.get("/edit/product/:id", ProductController.editProduct);

// update post
router.post("/update/product/:id", Upload.single("image"), ProductController.updateProduct);

// delete post
router.get("/delete/product/:id", ProductController.deleteProduct);

module.exports = router;