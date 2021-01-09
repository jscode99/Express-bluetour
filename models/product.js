const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 25,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offer: {
      type: Number,
    },
    // productPictures: [
    //   {
    //     img: {
    //       type: String,
    //     },
    //   },
    // ],
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    updatedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
