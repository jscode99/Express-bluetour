var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function (req, res, next) {
   let products = [
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-starters",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-starters",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-starters",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-starters",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-salads",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-salads",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-salads",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-salads",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-salads",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-salads",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-specialty",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-specialty",
     },
     {
       name: "Lobster Bisque",
       price: "$100",
       description: "Ithoru poli sadhnm ahnn myr",
       images: "images/Bluetours.png",
       category: "filter-specialty",
     },
   ];
  res.render('admin/view-packages',{products})
});


// Add packages

router.get('/admin/add-packages', (req, res) => {
  res.render('admin/add-packages')
});

router.post('/admin/add-packages', (req, res) => {
  console.log(req.body);
  console.log(req.files.image);
})

module.exports = router;
