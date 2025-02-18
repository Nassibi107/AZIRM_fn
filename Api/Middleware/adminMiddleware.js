

const User = require('../Models/User');

exports.checkIs = async (req, res, next) => {
    const user  = await User.findOne({where: {id: req.userRef}});
   console.log(req.userRef);
    if (user)
    {
        if (user.role === 'admin')
        {
            next();
        }
        else
        {
            res.status(401).json({message: 'Unauthorized'});
        }
    }
}