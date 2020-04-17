const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');


//GET request to api/register
router.get('/register', authController.getRegister);
//POST request to api/register
router.post('/register', authController.postRegister);

//POST request to api/login
router.post('/login', authController.postLogin);


module.exports = router;