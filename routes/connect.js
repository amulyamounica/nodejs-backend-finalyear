var mangoose = require("mongoose");
var Schema = mangoose.Schema;

var item = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mangoose.model("Blog", item);
module.exports = Blog;
