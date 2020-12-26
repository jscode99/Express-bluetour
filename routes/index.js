var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

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
 
  res.render('index',{products,loggedIn:true,});
});

module.exports = router;
