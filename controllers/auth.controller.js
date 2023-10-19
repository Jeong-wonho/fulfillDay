const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const User = require('../models/user.model');

dotenv.config();

const jwt_token = process.env.JWT_TOKEN;

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const nickname = req.body.nickname;
    const password = req.body.password;
    const registration_type = req.body.registration_type;

    bcrypt
        .hash(password, 12)
        .then((hashedPw) => {
            const user = new User({
                email: email,
                nickname: nickname,
                password: hashedPw,
                registration_type: registration_type
            });
            return user.save();
        })
        .then((result) => {
            res.status(201).json({message: 'User created', userId: result._id });
        })
        .catch((err) => {
            console.log(err);
        })

}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
    .then((user) => {
        console.log('user', user);
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
            },
            jwt_token,
            {expiresIn: '1h'} 
        );
        res.status(200).json({token: token, userId: loadedUser._id.toString()});
    })
    .catch((err) => {
        console.log(err);
    });
}