const express = require('express');

const router = express.Router();
const Model = require('../Models');

router.get('/', (req, res) => {
    res.send("API is working");
});

router.get('/userQr/:id', async (req, res) => {
    const { id } = req.params;
    const user = await Model.User.findByPk(id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        qrCode: user.qrCode
    }
    res.json(userData);
});
//
https://codepen.io/supah/pen/OMdPpW
exports.router = router;