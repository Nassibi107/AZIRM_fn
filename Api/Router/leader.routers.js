const express = require('express');

const router = express.Router();

const leaderController = require("../controllers/leaderController.js");
const adminController = require("../controllers/adminController.js");
const authMiddleware = require("../Middleware/authMiddleware.js");
const SquareControllers = require("../controllers/SquareControllers.js");


router.use(authMiddleware.check);
router.get('/users', leaderController.getUsers);
router.get('/user/:id', leaderController.getUserId);
router.put('/user/:id', leaderController.updateUserId);
router.put('/userStatus/:id', leaderController.updateUserId);
router.delete('/user/:id', leaderController.destroyUser);
router.post('/don', leaderController.insertDonation);
router.put('/don/:id', leaderController.updateDon);
router.get('/don/:id', adminController.getDonationsbyID);
router.get('/top-leaders', SquareControllers.getTopEmployeesByPayments);
router.get("/topWeek", leaderController.getTopWeek);
exports.router = router;