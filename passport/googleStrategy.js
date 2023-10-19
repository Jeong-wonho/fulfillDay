const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

require("dotenv").config();

const User = require("../models/user.model");

module.exports = () => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    }),
    async function (accessToken, refreshToken, profile, done) {
      //mongoose code input+
      console.log('google profile:', profile);
      try{
        const exUser = await User.findOne({
            //구글 플랫폼에서 로그인했고 & snsId 필드에 아이디가 일치할 경우
            where: { snsId: profile.id, provider: 'google'}
        });
        //이미 가입된 구글 프로필이면 인증 완료
        if (exUser) {
            done(null, exUser);
        } else {
            const newUser = await User.create({
                email:profile.email[0].value,
                nick: profile.displayName,
                snsId: profile.id,
                provider: 'google',
            });
            done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        done(error);
      }
      
    }
  );
};
