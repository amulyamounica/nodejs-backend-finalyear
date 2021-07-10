var express = require("express");
var router = express.Router();
var mangoose = require("mongoose");

/* GET users listing. */
router.post("/", function (req, res, next) {
  console.log(res);
  if (
    res.req.body.name == "mounicathummapudi@gmail.com" &&
    res.req.body.pass1 == "12345"
  )
    res.send("success");
  else {
    res.send("error");
  }
});

module.exports = router;
