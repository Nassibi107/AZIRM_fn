
const Model = require('../Models');
const bcrypt = require('bcryptjs');
// Register a new user
const jwtHelper = require('../utils/jwtHelper');

exports.register = async (req, res) => {
    const { 
          firstName,
          lastName,
          phoneNumber,
          email,
          role,
          address,
          password,
          income,
          status,
            label,
    } = req.body;
    try {
        console.log(req.body);
        let userItem = {}
        const passwordCrypt = await bcrypt.hash(password, 10);
        if (role === 'leader' || role === 'user') {
            const  company = await Model.Company.findOne({
                 where: { label}
            });
            const user = await Model.User.create({
                firstName,
                lastName,
                phoneNumber,
                email,
                role,
                address,
                password: passwordCrypt,
                income,
                status,
                CmpRid : company.cmpID,
            });
            userItem = user;
        }
        else {
            const user = await Model.User.create({
                firstName,
                lastName,
                phoneNumber,
                email,
                role,
                address,
                password: passwordCrypt,
                income,
                status,
            });
            userItem = user;
        }
        res.status(201).json({
            success: true,
            data: userItem
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await Model.User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = jwtHelper.sign({ id : user.id, email: user.emailAddress,name: user.firstName});
        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}


exports.me = async (req, res) => {
    try {
        const user = await Model.User.findOne({
            where: {
                id: req.userRef
            }
        });
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(403).json({msg:'forbidden'});
    }
}