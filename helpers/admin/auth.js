//model user
const User = require("../../models/user");
// model verification
const verificationcode = require("../../models/verificationcode");
//bcrypt
const bcrypt = require("bcrypt");
//jwt
const jwt = require("jsonwebtoken");
//key
const { JWT_SECRET } = require("../../key");
//clientID
const key = require("../../key");
// email
const { sendEmail } = require("../../services/email");
//uuid
const { v4: uuidv4 } = require("uuid");
// Moments
const moment = require("moment");

// ================== Signup router ====================
exports.signup = async (req, res) => {
  try {
    //=========== Destructuring the req body ========================
    const { fullname, email, password } = req.body;
    //========== finding user =====================================
    const user = await User.findOne({ email: email, role: "admin" });

    if (user) return res.status(422).json({ error: "Admin already exists" });
    //password hashing
    const Password = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullname,
      email,
      password: Password,
      role: "admin",
    });

    await newUser.save();

    const verify = new verificationcode({
      code: uuidv4(),
      codeType: "EMAIL_ACTIVATION",
      userId: newUser.id,
    });

    await verify.save();

    // Activation link generation
    const url = `${key.FRONTEND.host}${key.FRONTEND.emailActivationLink}${verify.code}`;
    await sendEmail(url, newUser.email, "Please verify your email address");

    return res
      .status(200)
      .json({ success: "Check your email & verify email address !!" });
    //catching database error
  } catch (error) {
    console.log(error);
  }
};
//=============================================================================

//================================= Email Activation ==========================
exports.emailActivation = async (req, res, next) => {
  try {
    const verification = await verificationcode.findOne({
      code: req.body.code,
    });
    if (!verification)
      return res.status(422).json({ error: "Invalid link !!!" });
    // Link Expiration logic using moment npm
    const now = moment();
    const linkCreated = moment(verification.createdAt);
    const diff = now.diff(linkCreated, "minutes");
    if (diff > 180)
      return res.status(422).json({ errorMin: "Oops..Link expired !!" });
    // Updating user document
    const user = await User.findById(verification.userId);
    user.emailVerificationStatus = true;
    user.activeStatus = true;
    await user.save();
    // Sucess email generation
    const body = "Successfully verified your email address";
    await sendEmail(body, user.email, "Registration success !!");
    return res
      .status(200)
      .json({ success: "Account created successfully !!!" });
  } catch (error) {
    next(error);
  }
};
//=============================================================================

// ================== Signin router ====================
exports.sigin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email, role: "admin" }).exec((err, user) => {
    if (err) return res.status(422).json({ error: "Invalid email" });
    if (user && user.role === "admin") {
      bcrypt.compare(password, user.password).then(doMatch => {
        if (doMatch) {
          //jwt token auth
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            JWT_SECRET,
            {
              expiresIn: "7d",
            },
          );
          //DESTRUCTURING THE USER
          const { _id, role, email } = user;
          res.status(200).json({ token: token, user: { _id, role, email } });
          res.render("admin/view-packages");
        } else {
          return res.status(422).json({ message: "Invalid email or password" });
        }
      });
    } else {
      res.status(422).json({ error: "Invalid email or password !!" });
    }
  });
};
//==============================================================================

//============================== Forgot password ===============================
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, role: "admin" });
    if (!user) return res.status(422).json({ message: "User not found !!!" });
    // Forgot password link creation
    const verify = new verificationcode({
      code: uuidv4(),
      codeType: "FORGOT_PASSWORD",
      userId: user.id,
    });

    await verify.save();

    // Activation link generation
    const url = `${key.FRONTEND.host}${key.FRONTEND.forgotPassword}${verify.code}`;
    await sendEmail(url, user.email, "Reset your password");
    res
      .status(200)
      .json({ message: "Check your mail account for password reset link..." });
  } catch (error) {
    console.log(error);
  }
};
//==============================================================================

//================================== Logout ====================================
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
//==============================================================================
