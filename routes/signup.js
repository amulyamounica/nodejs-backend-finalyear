var mangoose = require("mongoose");
var Schema = mangoose.Schema;

var item = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Signup = mangoose.model("Signup", item);
module.exports = Signup;
