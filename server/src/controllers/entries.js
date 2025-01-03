var express = require('express');
var router = express.Router();

// Initialize a entries 
var entries = 0;

// POST to increment the entries
router.post('/entries', async function (req, res, next) {
    try {
        entriesr++;

        res.status(200).json({
            message: 'Counter incremented successfully!',
            entries: entries 
        });

    } catch (err) {
        console.error("Error occurred while incrementing counter:", err);
        
        res.status(500).json({
          message: 'An error occurred while incrementing the counter.',
          error: err.message
        });
    }
});

// GET to retrieve the current counter value
router.get('/entries', async function (req, res, next) {
    try {
        res.status(200).json({
            entries: entries
        });
    } catch (err) {
        console.error("Error occurred while retrieving counter:", err);
        
        res.status(500).json({
          message: 'An error occurred while retrieving the counter.',
          error: err.message
        });
    }
});


module.exports = router;