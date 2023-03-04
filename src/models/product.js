const mongoose = require("mongoose");

const Schema = new mongoose.Schema("", {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imsges: {
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  dislikes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  bookmark: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  format: {
    type: String,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
  },
  details: {
    type: Object,
    required: true,
  },
});

const ProductModel = mongoose.model("product", Schema);

module.exports = {
  ProductModel,
};
