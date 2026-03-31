const express = require("express");

const CategoryController = require("../controllers/CategoryController");

const router = express.Router();

// user register

router.get("/category/view", CategoryController.CategoryFormView);

router.post("/create/category", CategoryController.CreateCategory);

// get all posts
router.get("/category_list", CategoryController.getAllCategory);

// get single post
router.get("/edit/category/:id", CategoryController.editCategory);

// update post
router.post("/update/category/:id", CategoryController.updateCategory);

router.get("/softdelete/category/:id", CategoryController.deleteCategory);

module.exports = router;