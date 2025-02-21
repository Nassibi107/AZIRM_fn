const express = require('express');

const router = express.Router();

const leaderController = require("../controllers/leaderController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Apply middlewares to all routes in this router
router.use(authMiddleware.check);

router.get('/users', leaderController.getUsers);

router.get('/user/:id', leaderController.getUserId);
router.put('/user/:id', leaderController.updateUserId);
router.put('/userStatus/:id', leaderController.updateUserId);
router.delete('/user/:id', leaderController.destroyUser);

exports.router = router;