const express = require('express');

const router = express.Router();

const authController = require("../controllers/authContoller.js");

router.post('/register',authController.register);

exports.router = router;