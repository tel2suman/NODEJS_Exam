
const Category = require("../models/category");

class CategoryController {
  // Register Category page
  async CategoryFormView(req, res) {
    res.render("category_form", {
      title: "Category Form Page",
    });
  }

  // Register Category page
  async getAllCategory(req, res) {
    try {
      const categories = await Category.find();

      res.render("category_list", {
        title: "Category List Page",
        categories,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // create category
  async CreateCategory(req, res) {
    try {
      const { categoryName } = req.body;

      if (!categoryName || !categoryName.trim()) {
        return res.redirect("/category/view");
      }

      const existCategory = await Category.findOne({ categoryName });

      if (existCategory) {
        return res.redirect("/category/view");
      }

      const data = await Category.create({ categoryName });

      if (data) {
        res.redirect("/category_list");
      } else {
        res.redirect("/category/view");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //edit student
  async editCategory(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.redirect("/category_list");
      }

      const data = await Category.findById(id);

      if (!data) {
        return res.redirect("/category_list");
      }

      res.render("edit_category", {
        title: "Edit Category",
        data: data,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).send("Something went wrong");
    }
  }

  //update category
  async updateCategory(req, res) {

    try {

      const id = req.params.id;

      const { categoryName, status } = req.body;

      // ✅ Validation
      if (!categoryName || !categoryName.trim()) {

        return res.status(400).send("Category name is required");
      }

      // ✅ Check category exists (not deleted)
      const category = await Category.findOne({_id: id, isDeleted: false});

      if (!category) {
        return res.status(404).send("Category not found");
      }

      // ✅ Check duplicate
      const duplicate = await Category.findOne({
        categoryName: categoryName.trim(),
        _id: { $ne: id },
        isDeleted: false,
      });

      if (duplicate) {
        return res.status(400).send("Category already exists");
      }

      const edit = await Category.findByIdAndUpdate(
        id,
        {
          $set: {
            categoryName: categoryName.trim(),
            status: status === "true" || status === true,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      res.redirect("/category_list");

    } catch (error) {

      console.log(error);

      return res.status(500).send("Something went wrong");
    }
  }

  // SOFT DELETE
    async deleteCategory(req, res) {

        try {

            const { id } = req.params;

            await Category.findByIdAndUpdate(id, {
                
            $set: { isDeleted: true },
            });

            res.redirect("/category/view");

        } catch (error) {

            console.log(error);
        }
    }
}


module.exports = new CategoryController();