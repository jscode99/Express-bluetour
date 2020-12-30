const Product = require("../models/product");
// const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  // res.status(200).json({file:req.files,body:req.body   })

  // Destructured req.body
  const { name, price, description, category, createdBy } = req.body;

  // Filename assigning to img property
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      return { img: file.filename };
    });
  }
  //=======================================================
  // Creating product document
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  // Saving product document
  product.save((error, products) => {
    if (error) return res.status(422).json({ error });
    if (products) return res.status(200).json({ products });
  });
};
