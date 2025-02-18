const jwtHelper = require('../utils/jwtHelper');


exports.check = (req, res, next) =>
{
    const token = req.headers['authorization'];

    if (!token)
    {
        return res.status(403).json({ message: 'No token provided!' });
    }
    const payload = jwtHelper.verify(token.split(' ')[1]);
    if(!payload)
    {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.userRef = payload.id;
    return next();
}