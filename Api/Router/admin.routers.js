const express = require('express');

const router = express.Router();

const adminController = require("../controllers/adminController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/adminMiddleware.js");

// Apply middlewares to all routes in this router
router.use(authMiddleware.check, isAdmin.checkIs);

// Manage company
router.post('/CreateCmp', adminController.CreateCmp);
router.get('/cmps', adminController.getAllCompanies);
router.delete('/cmp/:id', adminController.destroyCompany);

// Manage users
router.get('/users', adminController.getUsers);
router.get('/user/:id', adminController.getUserId);
router.put('/user/:id', adminController.updateUserId);
router.put('/userStatus/:id', adminController.updateUserId);
router.delete('/user/:id', adminController.destroyUser);

exports.router = router;