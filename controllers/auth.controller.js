const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const passport = require("passport");

const User = require("../models/user.model");

dotenv.config();


/**
 * 
 *    email: { type: String, required: true },
    nick: { type: String, required: true },
    password: { type: String, required: false },
    snsId: { type: String, required: true },
    provider: { type: String, required: true },
 *  
 */
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const nick = req.body.nick;
  const password = req.body.password;
  const provider = req.body.provider;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        nick: nick,
        password: hashedPw,
        provider: provider,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.login = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   let loadedUser;
//   User.findOne({ email: email })
//     .then((user) => {
//       console.log("user", user);
//       loadedUser = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then((isEqual) => {
//       const token = jwt.sign(
//         {
//           email: loadedUser.email,
//           userId: loadedUser._id.toString(),
//         },
//         jwt_token,
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({ token: token, userId: loadedUser._id.toString() });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.passportLogin = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        console.log(user);
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // jwt.sign('token내용', 'JWT secretkey')
            const token = jwt.sign(user.toJSON(), process.env.JWT_TOKEN);
            return res.json({user, token});
        });
    })(req, res);
};
