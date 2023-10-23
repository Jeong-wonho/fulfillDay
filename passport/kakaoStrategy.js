const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const bcrypt = require("bcrypt");

require("dotenv").config();

const User = require("../models/user.model");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { email: profile.email, provider: "kakao" },
          });
          // 이미 가입된 프로필이면 성공
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              provider: "kakao",
            });
            done(null, newUser); //회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
