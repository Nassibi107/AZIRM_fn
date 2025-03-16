
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

exports.getCashLive = async (req, res) => {
    try {
        const user = await Model.User.findOne({
            where: {
                id: req.userRef
            }
        });
        const getAmount = await Model.Donation.findAll({
            where: {
                userId: req.userRef
            }
        });
        const daily  = getAmount.map(payment => ({
            createdAt: payment.createdAt,
            amount: payment.amount
        })).filter(payment => payment.createdAt.getDate() === new Date().getDate());
        res.status(200).json({
            success: true,
            amount: {
                week :0,
                direct :daily,
                total : getAmount.reduce((sum, amount) => sum + amount.amount, 0)
            }
        
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


