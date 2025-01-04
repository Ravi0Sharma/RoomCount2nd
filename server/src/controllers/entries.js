var express = require('express');
const { publishToTopic } = require('../../mqttClient');
var router = express.Router();

// Initialize a entries 
var entries = 0;
var surpass = 0; 

// POST to increment the entries
router.post('/entries', async function (req, res, next) {
    try {
        entries++;

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

// POST to increment the Surpass
router.post('/entries', async function (req, res, next) {
    try {
        surpass++;

        res.status(200).json({
            message: 'Surpass incremented successfully!',
            surpass: surpass
        });

    } catch (err) {
        console.error("Error occurred while incrementing Surpass:", err);
        
        res.status(500).json({
          message: 'An error occurred while incrementing the Surpass',
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

//Post MAX entries 
router.post('/entries/maxset', async (req, res) => {
    try {
        const { value } = req.body;

        if (typeof value === 'number') {
            const topic = 'RoomCount/1/SUB_MAX';
            const payload = value.toString();

            publishToTopic(topic, payload);
            res.status(200).json({
                message: 'maxSet updated and published successfully!',
                maxSet: value,
            });
        } else {
            res.status(400).json({
                message: 'Invalid value. "value" must be a number.',
            });
        }
    } catch (err) {
        console.error('Error occurred while setting maxSet:', err);
        res.status(500).json({
            message: 'An error occurred while processing the request.',
            error: err.message,
        });
    }

});


module.exports = router;