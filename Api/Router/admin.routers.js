const express = require('express');

const router = express.Router();

const adminController = require("../controllers/adminController.js");
const authMiddleware = require("../middleware/authMiddleware.js");


router.post('/login',authController.login);

router.post('/CreateCmp',authMiddleware.check,adminController.CreateCmp);

exports.router = router;