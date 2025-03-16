

const { where } = require('sequelize');
const Model = require('../Models');


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
        console.log(req.userRef);
        if (role === 'assistant' || role === 'user') {
            const company = await Model.Company.findOne({ where: { label } });

            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }

            // ✅ Dynamically add CmpRid to userData
            userData.CmpRid = company.cmpID;
            userData.createBy = req.userRef ;
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

exports.getUsers = async (req, res) => {
    try {
        const users = await Model.User.findAll({
            where: {
                createBy: req.userRef
            }
        });
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


exports.getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Model.User.findOne({
            where: {
              id: id,
              createBy: req.userRef
            }
          });
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

        const user = await Model.User.findOne({
            where: {
              id: id,
              createBy: req.userRef
            }});
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
            {
              where: {
                id: id,
                createBy: req.userRef
              }
            }
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

exports.destroyUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the user directly
        const deleted = await Model.User.destroy({
            where: {
              id: id,
              createBy: req.userRef
            }
          });

        if (!deleted) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User deleted successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.insertDonation = async (req, res) => {
    try {
        const { 
            amount,
            type,
            lat,
            lng,
            feed,
            userId
        } = req.body;

        const donation = await Model.Donation.create({
            amount,
            type,
            lat,
            lng,
            feed,
            userId
        });

        res.status(201).json({
            success: true,
            data: donation
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
}

exports.updateDon = async (req, res) => {
    const reqId = req.params.id;
    const { amount, type, lat, lng, feed } = req.body;
    try {
        const don = await Model.Donation.findOne({
            where: {
                idD: reqId
            }
        });
        if (!don) {
            return res.status(404).json({ msg: 'Donation not found' });
        }
        don.amount = amount;
        don.type = type;
        don.lat = lat;
        don.lng = lng;
        don.feed = feed;
        await don.save();
        res.status(200).json({ msg: 'Donation updated successfully', don });
    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
}

exports.getTopWeek = async (req, res) => {
     const{team_member_id} = req.query;


    try{
        let user = {};
        const tran = await Model.Transactions.findAll();
        if (!tran) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        if (team_member_id) {
            user = tran.filter(tran => tran.team_member_id === team_member_id);
        }
        res.status(200).json({
            success: true,
            data: tran,
            user : user,
        });
    }catch(error){
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}

