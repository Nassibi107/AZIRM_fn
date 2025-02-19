const express = require('express');

const router = express.Router();

const authController = require("../controllers/authContoller.js");
const authMiddleware = require("../middleware/authMiddleware.js");


router.post('/login',authController.login);
router.get('/me', authMiddleware.check, authController.me);

exports.router = router;