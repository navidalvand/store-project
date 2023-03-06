const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema("", {
  first_name: { type: String },
  last_name: { type: String },
  image: { type: String, default: "defult.jpg" },
  username: { type: String, required: true, lowercase: true },
  email: { type: String, lowercase: true },
  phone: { type: String },
  password: { type: String, required: true },
  token: { type: String, required: true },
  otp: {
    type: Object,
    default: {
      code: "",
      expires: 0,
    },
  },
  bills: { type: [], default: [] },
  discount: { type: [Object] },
  birthDay: { type: String },
  roles: {
    type: [String],
    default: ["USER"],
  },
});

const UserModel = mongoose.model("user", Schema);

module.exports = {
  UserModel,
};
