
const Model = require('../Models');
const bcrypt = require('bcryptjs');
// Register a new user
const jwtHelper = require('../utils/jwtHelper');

require('dotenv').config();
const moment = require("moment-timezone");
const timezone ="America/Montreal"

const { Op } = require("sequelize");
// Helper functions using moment-timezone

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


function formatStartNoonTZ(date) {
    return moment(date)
        .tz(timezone)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();
}

function formatEndMidnightTZ(date) {
    return moment(date)
        .tz(timezone)
        .add(1, "day")
        .startOf("day")
        .toISOString();
}

exports.getCashLive = async (req, res) => {

    const now = moment().tz(timezone);
    
    // Get hours and minutes
    const hours = now.hour();    // Returns an integer (0-23)
    const minutes = now.minute(); // Returns an integer (0-59)
    
    // Log the results
    console.log(`Current Time in ${timezone} is ${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
    try {
        let currentDate = new Date();
        let currentDay = moment(currentDate).tz(timezone).day();
        let daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;

        let startDate = moment(currentDate).tz(timezone).subtract(daysToSubtract, "days").toDate();
        let formattedStartDate = formatStartNoonTZ(startDate);

        let endDate = moment(startDate).tz(timezone).add(6, "days").toDate();
        let formattedEndDate = formatEndMidnightTZ(endDate);

        let todayStart = formatStartNoonTZ(new Date());  
        let todayEnd = formatEndMidnightTZ(new Date());
    
        console.log("todayStart", todayStart);
        // Fetch today's donations
        console.log("todayeEnd", todayEnd);

        console.log("formattedStartDate", formattedStartDate);
        console.log("formattedEndDate", formattedEndDate);
        const dailyDonations = await Model.Donation.findAll({
            where: {
                userId: req.userRef,
                createdAt: { [Op.between]: [todayStart, todayEnd] }
            }
        });
         
        // Fetch weekly donations
        const weeklyDonations = await Model.Donation.findAll({
            where: {
                userId: req.userRef,
                createdAt: { [Op.between]: [formattedStartDate, formattedEndDate] }
            }
        });

        const weekly = weeklyDonations.map(payment => ({
            createdAt: payment.createdAt,
            amount: parseFloat(payment.amount)
        }));

        const daily = dailyDonations.map(payment => ({
            createdAt: payment.createdAt,
            amount: parseFloat(payment.amount)
        }));

        res.status(200).json({
            success: true,
            amount: {
                week: weekly.reduce((sum, payment) => sum + payment.amount, 0),
                direct: daily,
                totalDaily: daily.reduce((sum, payment) => sum + payment.amount, 0)
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


