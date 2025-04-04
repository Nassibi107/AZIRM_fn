const express = require('express');

const router = express.Router();

const adminController = require("../controllers/adminController.js");
const SquareControllers = require("../controllers/SquareControllers.js");
const authMiddleware = require("../Middleware/authMiddleware.js");
const isAdmin = require("../Middleware/adminMiddleware.js");

// Apply middlewares to all routes in this router
router.use(authMiddleware.check, isAdmin.checkIs);

// Manage company
router.post('/CreateCmp', adminController.CreateCmp);
router.get('/cmps', adminController.getAllCompanies);
router.delete('/cmp/:id', adminController.destroyCompany);
router.get('/cmp/:id', adminController.getCmpId);
router.put('/user/:id', adminController.updateUserId);

// Manage users
router.get('/users', adminController.getUsers);

router.get('/user/:id', adminController.getUserId);
router.put('/userStatus/:id', adminController.updateUserId);
router.delete('/user/:id', adminController.destroyUser);
// square 
router.get('/team-members', SquareControllers.getEmployesSquare);
router.get('/payments', SquareControllers.getPayement);

router.get('/dons', adminController.getAllDonations);
router.get("/report",SquareControllers.getPayementsByDate);
router.delete("/don/",adminController.DeleteAllDontion);
router.get("/reportDaily",SquareControllers.getDonationsByDate);
router.get("/getAddress",SquareControllers.getLaction);
exports.router = router;