const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String, required: true },
  type: { type: String, default: "main" },
});

const SliderModel = mongoose.model("slider", Schema);

module.exports = {
  SliderModel,
};
