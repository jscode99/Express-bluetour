const mongoose = require("mongoose");

//======== CREATING SCHEMA FOR USERS ========
const userSchema = new mongoose.Schema(
  {
    emailVerificationStatus: {
      type: Boolean,
      default: false,
    },
    activeStatus: {
      type: Boolean,
      default: false,
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
