const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  image: { type: String, default: "defult.jpg" },
  username: { type: String, lowercase: true },
  email: { type: String, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String },
  token: { type: String },
  otp: {
    type: Object,
    default: {
      code: 0,
      expiresIn: 0,
    },
  },
  bills: { type: [], default: [] },
  discount: { type: [Object] },
  birthDay: { type: String },
  Roles: {
    type: [String],
    default: ["USER"],
  },
});

const UserModel = mongoose.model("user", Schema);

module.exports = {
  UserModel,
};
