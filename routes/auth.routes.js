const express = require("express");

const User = require("../models/user.model");
const authController = require("../controllers/auth.controller");
const { generateToken } = require('../passport/jwtStrategy');
const passport = require('passport');

const router = express.Router();

//기존 jwt 적용 코드
router.put("/signup", authController.signup);
// router.post('/login', authController.login);


//변경할 passport-jwt 코드
router.post('/passportlogin', authController.passportLogin);

//구글 oAuth2 
router.get('/login/google', passport.authenticate('google', {scope: ['profile']}));

//
router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  }));



module.exports = router;