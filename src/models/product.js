const mongoose = require("mongoose");

const Schema = new mongoose.Schema("", {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  dis_likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  bookmark: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  price: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
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
    default: {
      length: "",
      height: "",
      width: "",
      weight: "",
      color: [],
      model: [],
      madein: "",
    },
    required: true,
  },
});

const ProductModel = mongoose.model("product", Schema);

module.exports = {
    ProductModel,
};
