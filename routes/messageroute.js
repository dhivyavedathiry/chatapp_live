// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/auth.js');
const chatwindowController = require('../controllers/chatwindowcontroller');

// Routes
router.get('/users',chatwindowController.getUsers);

router.get('/messages',Authentication.authenticate, chatwindowController.getMessages);
router.post('/sendMessage',Authentication.authenticate, chatwindowController.sendMessage);

module.exports = router;
