const Model = require('../Models');
const bcrypt = require('bcryptjs');
// Register a new user
const jwtHelper = require('../utils/jwtHelper');



exports.register = async (req, res) => {
    try {
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

        console.log(req.body);

        // Hash password before storing in the database
        const passwordCrypt = await bcrypt.hash(password, 10);

        // Define userData object
        let userData = {
            firstName,
            lastName,
            phoneNumber,
            email,
            role,
            address,
            password: passwordCrypt,
            income,
            status,
        };

        // If the user is a 'leader' or 'user', fetch company ID
        if (role === 'leader' || role === 'user') {
            const company = await Model.Company.findOne({ where: { label } });

            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }

            // ✅ Dynamically add CmpRid to userData
            userData.CmpRid = company.cmpID;
        }

        // ✅ Create user with userData (including CmpRid if applicable)
        const userItem = await Model.User.create(userData);

        res.status(201).json({
            success: true,
            data: userItem
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.CreateCmp = async (req, res) => { 
    const { label } = req.body;
    
    try {
        const companyFind = await Model.Company.findOne({
            where: { label }
        });
        if (companyFind) 
            return res.status(400).json({ msg: 'Company already exists' });
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

exports.getUsers = async (req, res) => {
    try {
        const users = await Model.User.findAll();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}
exports.getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Model.User.findByPk(id);
        if(!user) {
            return res.status(404).json({msg: 'User not found'});
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}

exports.updateUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            firstName,
            lastName,
            phoneNumber,
            role,
            address,
            status,
            label
        } = req.body;

        const user = await Model.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Only update fields that are provided (not undefined)
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        if (role !== undefined) user.role = role;
        if (address !== undefined) user.address = address;
        if (status !== undefined) user.status = status;

        console.log(user);

        if (label) {  // Check if label is provided
            const company = await Model.Company.findOne({ where: { label } });

            console.log(company);
            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }
            user.CmpRid = company.cmpID;
        }

        await user.save();  // Save only modified fields

        // ✅ Send response after successful update
        res.json({ msg: 'User updated successfully', user });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    } 
};



exports.updatestatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const [updated] = await Model.User.update(
            { status },
            { where: { id } }
        );

        if (updated) {
            return res.status(200).json({ msg: 'User status updated successfully', status });
        } else {
            return res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Model.Company.findAll();
        res.status(200).json({
            success: true,
            data: companies
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}
exports.destroyCompany = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the company directly
        const deleted = await Model.Company.destroy({ where: { cmpID: id } });

        if (!deleted) {
            return res.status(404).json({ msg: 'Company not found' });
        }

        res.status(200).json({ msg: 'Company deleted successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.destroyUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the user directly
        const deleted = await Model.User.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User deleted successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
