const { urlencoded } = require("express");
var mangoose = require("mongoose");
var Schema = mangoose.Schema;

var item = new Schema(
  {
    ItemName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    pantryType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ramesh = mangoose.model("ramesh", item);
module.exports = ramesh;
