var mangoose = require("mongoose");
var Schema = mangoose.Schema;

var item = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    api: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Kandukur = mangoose.model("Kandukur", item);
module.exports = Kandukur;
