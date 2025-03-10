const express = require('express');

const router = express.Router();

const leaderController = require("../controllers/leaderController.js");
const authMiddleware = require("../Middleware/authMiddleware.js");


router.use(authMiddleware.check);
router.get('/users', leaderController.getUsers);
router.get('/user/:id', leaderController.getUserId);
router.put('/user/:id', leaderController.updateUserId);
router.put('/userStatus/:id', leaderController.updateUserId);
router.delete('/user/:id', leaderController.destroyUser);
router.post('/don', leaderController.insertDonation);
router.put('/don/:id', leaderController.updateDon);

exports.router = router;