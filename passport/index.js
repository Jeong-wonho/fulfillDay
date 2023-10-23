const passport = require("passport");
const local = require("./localStrategy");
const jwtStrategy = require("./jwtStrategy");
const google = require("./googleStrategy");
const kakao = require("./kakaoStrategy");

module.exports = () => {
  local();
  jwtStrategy();
    google();
  kakao();
};
