const express = require('express');



const signupController = require('../controllers/signupcontroller.js');
const loginController = require('../controllers/logincontroller.js');

const router = express.Router();


router.post('/signup',signupController.signup);
router.post('/login',loginController.login);


module.exports = router;
