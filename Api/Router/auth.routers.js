const express = require('express');

const router = express.Router();

const authController = require("../controllers/authContoller.js");
const authMiddleware = require("../Middleware/authMiddleware.js");
const adminController = require("../controllers/adminController.js");

router.post('/register',authMiddleware.check,adminController.register);
router.post('/login',authController.login);
router.get('/me', authMiddleware.check, authController.me);
router.put('/chpass', authMiddleware.check, authController.changePassword);
exports.router = router;