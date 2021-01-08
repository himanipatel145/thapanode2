const jwt = require('jsonwebtoken');
const Register = require('../models/registers');

const auth = async (req, res, next) => {
    try {
        const token = req.cookie.cookiesss;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        console.log("verifyUser:::::::", verifyUser);

        const user = await Register.findOne({ _id: verifyUser._id });
        console.log("user::::::::",user);
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = auth;