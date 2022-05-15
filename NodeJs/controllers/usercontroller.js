const express = require("express");
var router = express.Router();
var { Adduser } = require("../models/adduser");

router.get("/", (req, res) => {
  console.log("welcome");
});

module.exports = router;
