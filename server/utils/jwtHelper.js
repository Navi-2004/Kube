const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;  
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h'
    });
};
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
module.exports = { generateToken, verifyToken };
