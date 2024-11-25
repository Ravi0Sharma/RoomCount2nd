var express = require ('express');
var router = express.Router();

var User = require('../models/User.js');

// Create a new user (POST /api/users)
router.post('/api/users', async function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        sessions: req.body.sessions,
    });

    try {
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user: user
        });

    } catch (err) {
        console.error("Error while creating user:", err);  
        if (err.code ===11000) {

            let duplicateField = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                message : `A user with the same ${duplicateField} already exist`,
                field : duplicateField
            });
        }
        res.status(500).json({
            message : "Server error while creating user",
            error : err.message
        });
    } 
});


module.exports = router;
