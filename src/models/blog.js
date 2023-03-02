const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
});

const BlogModel = mongoose.model("blog", Schema);

module.exports = {
  BlogModel,
};
