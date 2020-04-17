const User = require('../model/auth');
const Event = require('../model/event');
const nodemailer = require('nodemailer-sendgrid-transport');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const cron = require('node-cron');
exports.viewEvents = (req, res, next) => {
    const userId = req.userId;
    Event.findById(userId).then( documents => {
        if (documents === null) {
            res.statusCode(400).json({
                message:'No Event added yet'
            });
        }else{
            res.status(200).json({
                message: documents
            });
        }
    }).catch( err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })

}

exports.createEvent = (req, res, next) => {
    const userId = req.userId;
    const receiverName = req.body.receiverName;
    const receiverEmail = req.body.receiverEmail;
    const receiverPhone = req.body.receiverPhone;
    const message = req.body.message;
    const date = req.body.date;
    const status = 0;

    const getDay = new Date(date).getDay();
    const getMonth = new Date(date).getMonth();
    const cronDate = {
        month: getMonth,
        day: getDay
    }
    console.log(getDay, getMonth);
    const eventDetails = new Event({
        userId: userId,
        receiverName: receiverName,
        receiverEmail: receiverEmail,
        receiverPhone: receiverPhone,
        message: message,
        date: date,
        status: status
    });

    let senderAction = null
    console.log('TEST 1 passed');
    eventDetails.save().then( result => {
        senderAction = result
       res.status(200).json({
            message: 'Created',
            data: senderAction
        });

        //console.log(senderAction);
        cron.schedule("* * * * * ", () => {
            console.log('TEST 2 passed, every minute'  + eventDetails);
        });

    }).catch( err => {
        senderAction = err;
        res.status(500).json({
            message: 'Error occured',
            data: senderAction
        })
    })

}

exports.deleteEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.findByIdAndDelete(eventId).then( result => {

    }).catch( err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}