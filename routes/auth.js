const router = require("express").Router();

//Helpers
const {
  signup,
  emailActivation,
  signin,
  forgotPassword,
  logout,
} = require("../helpers/auth");

//============= GET admin signup page ================
router.get("/user/signup", function (req, res, next) {
  res.render("signup");
});
//=====================================================

//============ GET admin sigin page ==================
router.get("/user/signin", function (req, res, next) {
  res.render("register");
});

//====================================================

//===================== signup route =================
router.post("/user/register", (req, res) => {
  signup;
});
//====================================================

//================== Email activation =================
router.post("/user/email-activation", (req, res) => {
  emailActivation;
});
//=====================================================

//======================signin route===================
router.post("/user/signin", (req, res) => {
  signin;
});
//=====================================================

//================= Forget password ===================
router.post("/user/forgot-password", (req, res) => {
  forgotPassword;
});
//=====================================================

//======================= Logout ======================
router.get("/user/logout", (req, res) => {
  logout;
});
//=====================================================

//====================== profile ======================

//=====================================================

module.exports = router;
