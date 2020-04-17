const express = require('express');
const router =  express.Router();

const isAuth = require('../middleware/isAuth');
const eventController = require('../controller/event');

//GET request from authenticated user to api/viewEvents
router.get('/viewEvents', isAuth, eventController.viewEvents);

router.post('/postEvents', isAuth, eventController.createEvent);

module.exports = router;