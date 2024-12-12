var express = require('express');
var router = express.Router();

// Initialize a counter
var counter = 0;

// POST to increment the counter
router.post('/entries', async function (req, res, next) {
    try {
        counter++;

        res.status(200).json({
            message: 'Counter incremented successfully!',
            counter: counter 
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
            counter: counter 
        });
    } catch (err) {
        console.error("Error occurred while retrieving counter:", err);
        
        res.status(500).json({
          message: 'An error occurred while retrieving the counter.',
          error: err.message
        });
    }
});


// POST to set the counter to a specific value (e.g., 0 when session ends)
router.post('/entries/set', async function (req, res, next) {
    try {
        const { value } = req.body; // Get the new counter value from the request body
        if (typeof value === 'number') {
            counter = value; // Set the counter to the new value
            res.status(200).json({
                message: 'Counter updated successfully!',
                counter: counter // Return the updated counter value
            });
        } else {
            res.status(400).json({
                message: 'Invalid value. "value" must be a number.'
            });
        }
    } catch (err) {
        console.error("Error occurred while setting counter:", err);
 
 
        res.status(500).json({
            message: 'An error occurred while setting the counter.',
            error: err.message
        });
    }
 });

module.exports = router;
