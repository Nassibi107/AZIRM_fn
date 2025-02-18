const Model = require('../Models');
const bcrypt = require('bcryptjs');
// Register a new user
const jwtHelper = require('../utils/jwtHelper');


exports.CreateCmp = async (req, res) => { 
    const { label } = req.body;
    try {
        const company = await Model.Company.create({
            label
        });
        res.status(201).json({
            success: true,
            data: company
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}
