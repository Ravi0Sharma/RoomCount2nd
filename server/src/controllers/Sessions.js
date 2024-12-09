var express = require ('express');
var router = express.Router();

var Session = require('../models/Session.js');

// POST a new session
router.post('/session', async function (req, res, next) {
    var session = new Session ({
        max_count: req.body.max_count,
        entries: req.body.entries,
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

//Get specific session
router.get('/session/:sessionId', async function (req, res) {
    try {

        const sessionId = req.params.sessionId;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ "message": "No such session" });
        }
        res.json(session);
    } catch (err) {
        console.error("Error occurred while fetching session:", err);
        res.status(500).json({
            message: "Server error while fetching session",
            error: err.message
        });
    }
});

module.exports = router;
