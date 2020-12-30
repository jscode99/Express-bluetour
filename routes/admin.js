var express = require("express");
var router = express.Router();
var {
  adminMiddleware,
  requireSignin,
} = require("../common-middleware/RequiresSign");
var createProduct = require("../helpers/product-helpers");
var multer = require("multer");
var shortid = require("shortid");
var path = require("path");

//======================== Multer ================================
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
//===============================================================

/* GET packages listing. */
router.get("/admin", function (req, res, next) {
  res.render("admin/view-packages");
});

// Get Request Add Packages
router.get(
  "/admin/add-packages",
  requireSignin,
  adminMiddleware,
  (req, res) => {
    res.render("admin/add-packages");
  },
);

// Post Request Add Packages
router.post(
  "/admin/add-packages",
  adminMiddleware,
  requireSignin,
  upload.array("productPictures"),
  (req, res) => {
    createProduct;
  },
);

module.exports = router;
