const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

module.exports = () => {
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    //   passReqToCallback: false,
    }, async (email, password, done) => {
      try {
        const exUser = await User.findOne({ email: email });
        if (exUser) {
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            done(null, exUser, {message: 'Logged In Successfully'});
          } else {
            done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          }
        } else {
          done(null, false, { message: '가입되지 않은 회원입니다.' });
        }
      } catch (error) {
        console.error('error', error);
        done(error);
      }
    }));
  };