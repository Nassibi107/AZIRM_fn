
const Model = require('../Models');
const bcrypt = require('bcryptjs');
// Register a new user
const jwtHelper = require('../utils/jwtHelper');


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

const { Op } = require("sequelize");

exports.getCashLive = async (req, res) => {
    try {
        // Get the start and end of today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Fetch user
        const user = await Model.User.findOne({
            where: { id: req.userRef }
        });

        // Fetch only today's donations using Sequelize
        const dailyDonations = await Model.Donation.findAll({
            where: {
                userId: req.userRef,
                createdAt: { [Op.between]: [startOfDay, endOfDay] } // Fetch only today's records
            }
        });

        // Format the response
        const daily = dailyDonations.map(payment => ({
            createdAt: payment.createdAt,
            amount: payment.amount
        }));

        res.status(200).json({
            success: true,
            amount: {
                week: 0,
                direct: daily,
                totalDaily: daily.reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

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


exports.getTopUser =  async (req, res) => {
    try {
        const user = await Model.User.findAll({
            limit: 4,
            order: [['createdAt', 'DESC']],

            where : {
                
            }
        });
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
       
        const userId = req.userRef;
        const user = await Model.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({ password: hashedPassword });

        return res.json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


