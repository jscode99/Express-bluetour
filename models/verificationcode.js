const mongoose = require("mongoose");

const verificationcodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    codeType: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.ObjectId },
  },
  { timestamps: true },
);

module.exports = mongoose.model("verificationcode", verificationcodeSchema);
