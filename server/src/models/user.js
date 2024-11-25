var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 1,
        max : 20,
        unique : true
    },
    password : {
        type : String,
        required: true,
        min : 1,
        max : 25,
    },
    sessions : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'session'      
    }]

}); 

var User = mongoose.model('User', userSchema); module.exports = User;
 



