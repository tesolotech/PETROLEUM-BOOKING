

const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user.model.js');


// Create and save user
exports.signupUser = (req, res, next) => {
    Users.findByEmailId(req.body.email).then((user) => {
        console.log(user);
        if (user) {
            return res.status(409).json({
                status: 409,
                message: `User Exists with ${req.body.email}`
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        error: err
                    });
                } else {
                    req.body.password = hash;
                    Users.createUser(req.body).then(result => {
                        res.status(200).json({ status: 200, message: 'User successfully created..' });
                    }).catch((error) => {
                        console.log('catch', error);
                        res.status(500).json({ status: 500, error: error });
                    })
                }
            })
        }

    }).catch((error) => {
        res.status(500).json({ status: 500, error: error });
    })
};

// Login user
exports.loginUser = (req, res, next) => {
    Users.findByEmailId(req.body.email).then(user => {
        console.log('result', user)
        if (!user) {
            res.status(401).json({
                status: 401,
                message: 'User not found'
            });
        }
        bcrypt.compare(req.body.password, user['password'], (err, result) => {
            if (err) {
                res.status(401).json({
                    status: 401,
                    message: 'Auth Failed: Password incorrect'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user['email'],
                    userId: user['_id']
                },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRESIN,

                    });

                res.status(200).json({
                    status: 200,
                    message: 'Auth Successful',
                    token: token,
                    api_token: process.env.API_KEY
                });
            }
            if (err) {
                res.status(401).json({
                    status: 402,
                    message: 'Auth Failed'
                });
            }
        });

    }).catch(error => {
        res.status(500).json({
            status: 500,
            error: error
        });
    })
};

exports.uploadProfilePic = (req, res, next) => {
    console.log(req.files[0])
    if (req.files[0].size < process.env.PROFILE_PIC_SIZE) {
        Users.findById(req.body.userId).then(result => {
            if (result) {
                Users.updateUserById(req.body.userId, req.files[0]['filename']).then(result => {
                    res.status(200).json({
                        status: 200,
                        message: `Files uploaded successfully`
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        status: 500,
                        message: `Someting went wroung`,
                        error: error
                    })
                })
            } else {
                res.status(409).json({ status: 409, message: 'User not found' })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                status: 500,
                message: `Someting went wroung`,
                error: err
            })
        })
    } else {
        res.status(400).json({ status: 400, error: `File size should be less then ${process.env.PROFILE_PIC_SIZE}` })
    }

}




//Get all Users
exports.GetAllUser = (req, res) => {
    Users.getUserList().then(result => {
        res.status(200).json({
            status: 200,
            data: result,
            message: 'Success'
        });
    }).catch(error => {
        res.status(500).send({
            status: 500,
            message: error.message || "Some error occurred while retrieving users."
        });
    })

};


