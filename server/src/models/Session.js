var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    max_count : {
        type : Number,
        min : 1
    },
    entries  : {
        type : Number,
        default : 0
    }

}); 

var Session = mongoose.model('Session', userSchema); module.exports = Session;