var express = require("express");
var router = express.Router();
var passport = require('passport');
require('../passport-setup');





/* GET home page. */
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Home
router.get('/home', (req, res) => {
    res.render("index.hbs", {
      name: req.user.displayName,
      email: req.user.emails[0].value,
    });
})

// Callback
router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
    // Sucessfull authenthication,redirecting home
    res.redirect('/home')
})

module.exports = router;
