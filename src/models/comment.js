const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true },
});

const CategoryModel = mongoose.model("category", Schema);

module.exports = {
  CategoryModel,
};
