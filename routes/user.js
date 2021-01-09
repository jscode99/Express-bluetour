var express = require("express");
var router = express.Router();
// var {
//   userMiddleware,
//   requireSignin,
// } = require("../common-middleware/RequiresSign");
// var { createProduct } = require("../helpers/product-helpers");

/* GET packages listing. */
router.get("/user", function (req, res, next) {
  res.render("home");
});

// Get Request Add Packages
// router.get(
//   "/admin/add-packages",
  // requireSignin,
  // adminMiddleware,
//   (req, res) => {
//     res.render("admin/add-packages");
//   },
// );

// Post Request Add Packages
// router.post(
//   "/admin/add-packages",
  // adminMiddleware,
  // requireSignin,
//   createProduct,
// );

module.exports = router;
