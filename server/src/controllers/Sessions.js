var express = require ('express');
var router = express.Router();

var Session = require('../models/Session.js');

// POST a new session
router.post('/session', async function (req, res, next) {
    var session = new Session ({
        max_count: req.body.max_count,
        entries: req.body.entries,
        username: req.body.username,
        surpass: req.body.surpass
    });

    try {
        await session.save();
        res.status(201).json({
            message: "Session created successfully",
            session: session
        });

    } catch (err) {
        console.error("Error occurred while creating session:", err);
    
        res.status(500).json({
            message: "An error occurred while creating the session.",
            error: err.message
        });
    }
});

// Get sessions by username
router.get('/sessions/:username', async function (req, res) {
    try {
        const { username } = req.params; 

        // Fetch sessions where the username matches
        const sessions = await Session.find({ username: username });

        if (!sessions || sessions.length === 0) {
            return res.status(404).json({ "message": `No sessions found for ${username}` });
        }

        res.json(sessions); 
    } catch (err) {
        console.error("Error occurred while fetching sessions:", err);
        res.status(500).json({
            message: "Server error while fetching sessions",
            error: err.message
        });
    }
});

module.exports = router;
