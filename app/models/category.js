
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const slugify = require("slugify");

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },

    categorySlug: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    createOn: {
      type: Date,
      default: new Date(),
    },

    updateOn: {
      type: Date,
      default: new Date(),
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

// ✅ AUTO GENERATE SLUG
CategorySchema.pre("validate", function () {
  if (this.categoryName && !this.categorySlug) {
    this.categorySlug = slugify(this.categoryName, {
      lower: true,
      strict: true,
    });
  }
});


// ✅ UPDATE SLUG
CategorySchema.pre("findOneAndUpdate", function () {

  let update = this.getUpdate();
  // normalize update object
  const data = update.$set ? update.$set : update;
  if (data.categoryName) {
    data.categorySlug = slugify(data.categoryName, {
      lower: true,
      strict: true,
    });
  }
  data.updateOn = Date.now();
});

const categoryModel = mongoose.model("category", CategorySchema);

module.exports = categoryModel;

