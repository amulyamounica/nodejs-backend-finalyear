const { urlencoded } = require("express");
var mangoose = require("mongoose");
var Schema = mangoose.Schema;

var item = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    shop: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    progress: {
      type: String,
      required: true,
    },
    dates: {
      type: String,
      required: true,
    },
    months: {
      type: String,
      required: true,
    },
    years: {
      type: String,
      required: true,
    },
    times: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const orders = mangoose.model("orders", item);
module.exports = orders;
