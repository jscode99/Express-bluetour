var express = require("express");
var router = express.Router();
var passport = require('passport');
require('../passport-setup');


//////// Auth middleware that checks if the user is logged in ////////////
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
//////////////////////////////////////////////////////////////////////////


/////////// protected and unprotected routes//////////////////////////////
router.get('/', (req, res) => res.render('index.hbs'));
router.get('/failed', (req, res) => res.send('You Failed to log in!'));
/////////////////////////////////////////////////////////////////////////


////////////////////////* GET home page. */////////////////////////////////
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
//////////////////////////////////////////////////////////////////////////


///////////////// Home ////////////////////////////////////////////
router.get('/good', isLoggedIn, (req, res) => {
  res.render("home.hbs", {
    name: req.user.displayName,
    email: req.user.emails[0].value,
  });
});
///////////////////////////////////////////////////////////////////


////////////////// Callback //////////////////////////////////////
router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
  // Sucessfull authenthication,redirecting home
  res.redirect('/good')
});
//////////////////////////////////////////////////////////////////


////////////// Logout and session clearing///////////////////////
router.get("/google/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});
////////////////////////////////////////////////////////////////

module.exports = router;
