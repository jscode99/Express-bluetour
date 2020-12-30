const router = require("express").Router();

//Helpers
const {
  signup,
  emailActivation,
  signin,
  forgotPassword,
  logout,
} = require("../../helpers/admin/auth");


//============= GET admin signup page ================
router.get("/admin/signup", function (req, res, next) {
  res.render("adminsignup");
});
//=====================================================

//============ GET admin sigin page ==================
router.get("/admin/signin", function (req, res, next) {
  res.render("adminregister");
});

//====================================================

//===================== signup route =================
router.post("/admin/register", (req, res) => {
  signup
});
//====================================================

//================== Email activation =================
router.post("/admin/email-activation", (req, res) => {
   emailActivation
});
//=====================================================

//======================signin route===================
router.post("/admin/signin", (req, res) => {
  signin
});
//=====================================================

//================= Forget password ===================
router.post("/admin/forgot-password", (req, res) => {
  forgotPassword
});
//=====================================================

//======================= Logout ======================
router.get("/admin/logout", (req, res) => {
  logout
});
//=====================================================

//====================== profile ======================

//=====================================================

module.exports = router;
