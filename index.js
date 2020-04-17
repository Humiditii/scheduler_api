const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');


// for form dat
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(bodyParser.json());

//setting request headers for incoming requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Passing the Application routes to the Express Middleware
app.use('/api', authRoutes);
app.use('/api', eventRoutes);



app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message
    });
});



const MONGO_URI = 'mongodb://localhost:27017/push_api';
const port = 4000;

mongoose.connect(MONGO_URI, {
    useNewUrlParser:true
}).then(connection => {
    app.listen(port, ()=> {
        console.log('Server Running at port ' + port);
    })
}).catch( err => {
    throw err;
})
