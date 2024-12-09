var express = require ('express');
var router = express.Router();

var User = require('../models/User.js');

// POST a new user 
router.post('/users', async function (req, res, next) {
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


//Get specific User
router.get('/users/:username', async function (req, res) {
    try{
    var username = req.params.username;
    const user = await User.findOne({username : username});
    if (!user){
        return res.status(404).json({"message": "No such user"});
    }
    res.json(user);
} catch (err) {
    res.status(500).json({"message" : "Server error", "error": err.message});
}
});

module.exports = router;
