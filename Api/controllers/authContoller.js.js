
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
        const ref =  Math.floor(Math.random() * 1000);
        if (role === 'manager') {
            await Model.Manager.create({
                references: ref,
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
