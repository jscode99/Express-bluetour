const express = require('express');
const router = express.Router();
//model user
const User=require('../../models/user')
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
//google auth lib
const { OAuth2Client } = require("google-auth-library");
// email
const { sendEmail } = require("../../services/email");
//uuid
const { v4: uuidv4 } = require("uuid");
// Moments
const moment = require("moment");


//====================== New OAuth2Client ============================
const client = new OAuth2Client(
  "670209693410-jephrvr7n8fp27m39ahao38n14jm1aeu.apps.googleusercontent.com",
);
//=============================================================

// ================== Signup router ====================
router.post('/admin/signup', async (req, res) => {
    try {
        //=========== Destructuring the req body ========================
        const { fullname, email, password } = req.body;
        //========== finding user =====================================
        const user = await User.findOne({ email: email });

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

        res
            .status(200)
            .json({ success: "Check your email & verify email address !!" });
        //catching database error
    } catch (error) {
        console.log(error);
    }
}
);
//=============================================================================

//================================= Email Activation ==========================
router.post("/admin/email-activation", async (req, res, next) => {
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
}
);
//=============================================================================

//================================= Google Login =============================
router.post('/admin/googleLogin', (req, res) => {
    const { tokenId } = req.body;
    client
        .verifyIdToken({
            idToken: tokenId,
            audience:
                "670209693410-jephrvr7n8fp27m39ahao38n14jm1aeu.apps.googleusercontent.com",
        })
        .then(response => {
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (err) {
                        return res.status(422).json({
                            error: "Something went wrong...",
                        });
                    } else {
                        if (user) {
                            //jwt token auth
                            const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                                expiresIn: "7d",
                            });
                            //DESTRUCTURING THE USER
                            const { _id, role, name, email } = user;
                            res
                                .status(200)
                                .json({ token: token, user: { _id, role, name, email } });
                        } else {
                            let password = email + JWT_SECRET;
                            let newUser = new User({
                                name,
                                email,
                                password,
                                role: "admin",
                            });
                            newUser.save((err, data) => {
                                if (err) {
                                    return res.status(422).json({
                                        error: "Something went wrong...",
                                    });
                                }
                                if (data) {
                                    //jwt token auth
                                    const token = jwt.sign({ _id: data._id }, JWT_SECRET, {
                                        expiresIn: "7d",
                                    });
                                    //DESTRUCTURING THE USER
                                    const { _id, role, name, email } = newUser;
                                    res
                                        .status(200)
                                        .json({ token: token, user: { _id, role, name, email } });
                                }
                            });
                        }
                    }
                });
            }
        });
}
);
//============================================================================

// ================== Signin router ====================
router.post('/admin/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).exec((err, user) => {
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
                } else {
                    return res.status(422).json({ message: "Invalid email or password" });
                }
            });
        } else {
            res.status(422).json({ error: "Invalid email or password !!" });
        }
    });
});
//==============================================================================

//============================== Forgot password ===============================
router.post("/admin/forgot-password", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
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
}
);
//==============================================================================



module.exports = router;