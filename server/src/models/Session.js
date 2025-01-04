var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sessionSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        ref: 'User'
    },

    max_count: {
        type: Number,
        min: 1,
    },
    entries  : {
        type : Number,
        default : 0,
        min: 0 
    },
    max_amount_surpass : {
    type : Number,
    default : 0,
    min: 0 
    }

}); 

var Session = mongoose.model('Session', sessionSchema); module.exports = Session;