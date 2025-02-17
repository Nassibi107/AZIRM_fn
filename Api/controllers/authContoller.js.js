
const Model = require('../Models');
const bcrypt = require('bcryptjs');
// Register a new user
const jwtHelper = require('../utils/jwtHelper');

exports.register = async (req, res) => {
    const { 
          firstName,
          lastName,
          phoneNumber,
          emailAddress,
          role,
          address,
          password,
          income,
          status,
    } = req.body;
    try {
        console.log(req.body);
        const passwordCrypt = await bcrypt.hash(password, 10);
        const user = await Model.User.create({
            firstName,
            lastName,
            phoneNumber,
            emailAddress,
            role,
            address,
            password: passwordCrypt,
            income,
            status,
        });
        const ref = firstName + lastName + Math.floor(Math.random() * 1000);
        if (role === 'manager') {
            await Model.Manager.create({
                references: ref.toString(),
            });
        }
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}

exports.login = async (req, res) => {
    const { emailAddress, password } = req.body;
    try {
        const user = await Model.User.findOne({
            where: {
                emailAddress
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
        const token = jwtHelper.sign({ id : user.id, email: user.emailAddress ,name: user.firstName});
        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}

