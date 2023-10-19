const express = require("express");

const User = require("../models/user");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put("/signup", authController.signup);
router.post('/login', authController.login);

//구글 oAuth2 
router.get('/login/google', passport.authenticate('google', {scope: ['profile']}));

//
router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router;