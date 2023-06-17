const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId },
});

const CategoryModel = mongoose.model("category", Schema);

module.exports = {
  CategoryModel,
};
