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
    shopName: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vendor = mangoose.model("Vendor", item);
module.exports = Vendor;
