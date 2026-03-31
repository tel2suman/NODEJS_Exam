
const Product = require("../models/product");

const Category = require("../models/category");

const cloudinary = require("../config/cloudinary");

const fs = require("fs");

class ProductController {

  // Register Product page
  async addProduct(req, res) {

    try {

      const categories = await Category.find();

        res.render("add_product", {
            title: "Product Create Page",
            categories,
        });

    } catch (error) {

      console.log(error.message);
    }
  }

  // get all posts
  async getAllProduct(req, res) {

    try {

      const data = await Product.find().populate("category");

      res.render("product_list", {
        title: "Product Lists",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(req, res) {
    try {
      const { name, slug, category, description } = req.body;

      //validate all fields
      if (!name ||!slug || !category || !description) {

        return res.redirect("/add/product");
      }

      // Get category details using ID
      const categoryname = await Category.findById(category);

      if (!categoryname) {

        req.flash("error", "Category not found");

        return res.redirect("/add/product");
      }

      const existProduct = await Product.findOne({ name });

      if (existProduct) {

        return res.redirect("/add/product");
      }

      //upload to clodinary
      const imageResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
        width: 500,
        height: 500,
        crop: "limit",
        quality: "auto",
      });

      // Delete local file after upload (important)
      if (req.file && req.file.path) {
        await fs.promises.unlink(req.file.path);
      }

      const productdata = new Product({
        name,
        category,
        description,
        slug,
        image: imageResult ? imageResult.secure_url : null,
        cloudinary_id: imageResult ? imageResult.public_id : null,
      });

      const data = await productdata.save();

      if (data) {

        res.redirect("/product_list");

      } else {

        res.redirect("/add/product");
      }
    } catch (error) {
      // cleanup local file if error happens
      if (req.file && fs.existsSync(req.file.path)) {
        await fs.promises.unlink(req.file.path);
      }

      console.log("Error storing employee:", error);

      return res.status(500).send("Something went wrong");
    }
  }
}


module.exports = new ProductController();