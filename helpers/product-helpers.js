const express = require("express");
const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  // Destructured req.body
  const { id, name, price, description, category } = req.body;

  let image = req.files.image;
  image.mv("../public/product-images/" + id + ".jpg", (err, done) => {
    if (err) return console.log(err);
    done();
  });

  // Creating product document
  const product = new Product({
    name,
    price,
    description,
    category,
    // createdBy: req.user._id,
  });
  // Saving product document
  product.save((error, products) => {
    console.log(error);
    if (error) return res.status(422).json({ error });
    if (products) {
      console.log({ products });
      // res.status(200).json({ products });
      return res.render("admin/add-packages");
    }
  });
};
