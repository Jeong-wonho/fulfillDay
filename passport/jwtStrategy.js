const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();

//JWT secretkey
const secretKey = process.env.JWT_TOKEN;

module.exports = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey,
      },
      async (jwtPayload, done) => {
        console.log("jwtpayload", jwtpayload);
        try {
          const result = await User.findOne(jwtPayload.id);
          if (result) {
            done(null, result);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};
