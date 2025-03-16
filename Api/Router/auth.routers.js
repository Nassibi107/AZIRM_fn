const express = require('express');

const router = express.Router();

const authController = require("../controllers/authContoller.js");
const authMiddleware = require("../Middleware/authMiddleware.js");
const adminController = require("../controllers/adminController.js");
const SquareController = require("../controllers/SquareControllers.js");

router.post('/register',authMiddleware.check,adminController.register);
router.post('/login',authController.login);
router.get('/me', authMiddleware.check, authController.me);
router.put('/chpass', authMiddleware.check, authController.changePassword);
router.get('/pays', authMiddleware.check, SquareController.getPayementsByTeamID); 
router.get('/cashLive', authMiddleware.check,authController.getCashLive);

exports.router = router;
