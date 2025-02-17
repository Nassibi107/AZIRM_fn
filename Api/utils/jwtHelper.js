const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.sign = (payload) => jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRATION });

exports.verify = (token) => 
{
    try 
    {
        return jwt.verify(token, secret);
    } 
    catch (err) 
    {
        return null;
    }
}