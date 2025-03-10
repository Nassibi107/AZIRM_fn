const Model = require('../Models');
const bcrypt = require('bcryptjs');
// Register a new user
const fs = require('fs');
const jwtHelper = require('../utils/jwtHelper');
const sendEmail = require('./mailer');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const path = require('path');
const URL_SQ = process.env.SQ_URL_REDIRECT;
// Ensure that the directory for QR codes exists
const qrCodeDirectory = path.join(__dirname, 'public', 'qrcodes');
if (!fs.existsSync(qrCodeDirectory)) {
    fs.mkdirSync(qrCodeDirectory, { recursive: true });
}

const uploadsFile = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsFile)) {
    fs.mkdirSync(uploadsFile, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsFile); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


exports.register = async (req, res) => {
    try {
        upload.single('uimg')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ msg: 'Image upload failed', error: err.message });
            }

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

            // Hash password
            const passwordCrypt = await bcrypt.hash(password, 10);

            // Define user data object
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
                uimg: req.file ? `/uploads/${req.file.filename}` : null, // Store image path
            };

                const company = await Model.Company.findOne({ where: {cmpID : label } });

                if (!company) {
                    return res.status(404).json({ msg: 'Company not found' });
                }

                
                userData.CmpRid = company.cmpID;
                userData.createBy = req.userRef;
        
            // Create the user in the database
            const userItem = await Model.User.create(userData);
            const userUrl = `${URL_SQ}/userQr/${userItem.id}`; //

            // Generate QR code with user details (could be a URL or just an identifier)
            const qrCodeFileName = `user_${userItem.id}.png`;
            const qrCodePath = path.join(qrCodeDirectory, qrCodeFileName);
    
            // Create the QR code and save it as a PNG image
            await QRCode.toFile(qrCodePath, userUrl);
    
            // Store the path to the QR code in the user data
            userItem.qr = `/qrcodes/${qrCodeFileName}`;
            await userItem.save();
    
            // Send a welcome email to the user after creation
            const emailSubject = ' Activation de votre compte Azirm';
const emailText = `
 
Bonjour  ${userItem.firstName} ${userItem.lastName},

Votre compte Azirm est maintenant activé. Vous pouvez dès à présent accéder à la plateforme et commencer votre mission : apporter du soutien et redonner le sourire aux enfants à travers la collecte de dons.

Dans quelques instants, vous recevrez un email contenant les instructions pour installer l’application et commencer à l'utiliser.

🔑 Informations de connexion :

Nom d'utilisateur ou email :${userItem.email}
Mot de passe : ${userItem.password}
Pour toute question ou assistance, notre équipe support est disponible à support@azirm.ca.

Merci pour votre engagement.

Cordialement,
L’équipe Azirm
`;
    
            await sendEmail(userItem.email, emailSubject, emailText, qrCodePath);

            // Respond with success
            res.status(201).json({
                success: true,
                data: userItem,
                qrCodePath: userItem.qrCodePath,
                profileImage: userItem.uimg // Return image path
            });
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

exports.getCmpId = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Model.Company.findByPk(id);
        if(!company) {
            return res.status(404).json({msg: 'Company not found'});
        }
        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}

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

exports.getDonationsbyID = async (req, res) => {
    try {
        const { id } = req.params;
        const donations = await Model.Donation.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json({
            success: true,
            data: donations
        });
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
}


exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Model.Donation.findAll();
        res.status(200).json({
            success: true,
            data: donations
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'Server Error'});
    }
}