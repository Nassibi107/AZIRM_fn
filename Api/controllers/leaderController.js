

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
            team_member_id,
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
            team_member_id
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

        upload.single('uimg')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ msg: 'Image upload failed', error: err.message });
            }

            const { 
                firstName,
                lastName,
                phoneNumber,
                role,
                address,
                status,
                label,
                email,
                team_member_id
            } = req.body;

            const user = await Model.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
      console.log(req.file);
            // Handle new image update
            if (req.file) {
                if (user.uimg) {
                    const oldImagePath = path.join(uploadDir, path.basename(user.uimg));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath); // Delete old image
                    }
                }
                user.uimg = `/uploads/${req.file.filename}`; // Update image path
            }

            // Update other provided fields
            if (firstName !== undefined) user.firstName = firstName;
            if (lastName !== undefined) user.lastName = lastName;
            if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
            if (role !== undefined) user.role = role;
            if (address !== undefined) user.address = address;
            if (status !== undefined) user.status = status;
            if (team_member_id !== undefined) user.team_member_id = team_member_id;
            if (email !== undefined) user.email = email;

            // Handle company association by label
            if (label) {  
                const company = await Model.Company.findOne({ where: { label } });
                if (!company) {
                    return res.status(404).json({ msg: 'Company not found' });
                }
                user.CmpRid = company.cmpID;
            }

            await user.save();

            res.json({ msg: 'User updated successfully', user });
        });

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
        userId,
        details // <-- this should be an array of Don_Details
      } = req.body;
  
      const donation = await Model.Donation.create({
        amount,
        type,
        lat,
        lng,
        feed,
        userId,
        details // Sequelize will auto-insert these into Don_Details
      }, {
        include: [{ model: Model.Don_Details, as: "details" }]
      });
  
      res.status(201).json({
        success: true,
        data: donation
      });
  
    } catch (error) {
      console.error("Insert donation error:", error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  };
  

  exports.updateDon = async (req, res) => {
    const reqId = req.params.id;
    const { type, lat, lng, feed, userId, details } = req.body;
  
    try {
      const don = await Model.Donation.findOne({
        where: { idD: reqId },
        include: [{ model: Model.Don_Details, as: "details" }]
      });
      if (!don) {
        return res.status(404).json({ msg: 'Donation not found' });
      }
      // Update donation main fields
      don.type = type || don.type;
      don.lat = lat || don.lat;
      don.lng = lng || don.lng;
      if (feed || feed == 0) {
      don.feed = feed ;
      }else{
        don.feed = don.feed;
      }
      don.userId = userId || don.userId;
      // Update Don_Details if provided
      if (Array.isArray(details)) {
        let totalAmount = 0;
  
        for (const item of details) {
          if (item.idDD) {
            // Update existing Don_Details
            const existingDetail = await Model.Don_Details.findOne({
              where: { idDD: item.idDD, donationId: don.idD }
            });
  
            if (existingDetail) {
              existingDetail.amount = item.amount || existingDetail.amount;
              existingDetail.type = item.type || existingDetail.type;
              existingDetail.feed = item.feed || existingDetail.feed;
              existingDetail.numP = item.numP || existingDetail.numP;
              existingDetail.description = item.description || existingDetail.description;
              await existingDetail.save();
              totalAmount += parseFloat(existingDetail.amount);
            }
          }
        }

        // Update total amount on Donation
        don.amount = totalAmount;
      }
  
      await don.save();
  
      res.status(200).json({
        msg: 'Donation and details updated successfully',
        donation: don
      });
  
    } catch (error) {
      console.error("Update donation error:", error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  };
  

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

