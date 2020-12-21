var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/admin/register", function (req, res, next) {
  res.render("adminregister");
});

module.exports = router;
