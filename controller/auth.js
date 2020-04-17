const User = require('../model/auth');
const byCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getRegister = (req, res, next) => {
    res.json({
        message: 'Welcome to the registration page'
    });
}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const address = req.body.address;
    const password = req.body.password;

    User.findOne({email:email}).then( foundUser => {
        if(foundUser){
            return res.status(400).json({
                message: 'Email already existed'
            });
        }else{
            return byCrypt.hash(password, 12).then(hashedPassword => {
                const createUser = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    gender: gender,
                    address: address,
                    password: hashedPassword
                });
                return createUser.save().then(result => {
                            res.status(201).json({
                                message: 'User created successfully',
                                data: result
                            });
                }).catch( err => {
                    if(!err.statusCode){
                        err.statusCode = 500;
                    }
                    next(err);
                });  

            }).catch(err => {
                if(!err.statusCode){
                    err.statusCode = 500
                }
                next(err);
            });
        }
    }).catch( err=> {
        if(err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })

}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email}).then( foundUser => {
        if (!foundUser) {
            return res.status(400).json({
                meassage: 'User not found, check the Email again'
            })
        }else if( foundUser ){
            return byCrypt.compare(password, foundUser.password).then( booleanResult => {
                if (!booleanResult) {
                    return res.status(400).json({
                        message: 'User Found but incorrect password'
                    });
                }else{
                    const token = jwt.sign({
                        email: foundUser.email,
                        userId: foundUser._id.toString()
                    }, 'easypayapisupersecrete', {
                        expiresIn: '1h'
                    });
                    return res.status(201).json({
                        message: foundUser.name + ' logged in',
                        data: {
                            token: token,
                            userId: foundUser._id.toString()
                        }
                    });
                }
            }).catch( err => {
                if(!err.statusCode){
                    err.statusCode = 500
                }
                next(err);
            })
        }
    }).catch( err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.postForgetPwd = (req, res, next) => {
    const email = req.body.email;
    const securityQues = req.body.question;

    User.findOne({email: email}).then( user => {
        const UserQuestion = ''; 
    }).catch( err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
    
}