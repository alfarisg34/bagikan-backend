const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

//create admin Schema & model
const AdminScheme = new Scheme({
    username:{
        type:String,
        required: [true,'Username field is required'],
        unique:true,
        lowercase: true,
        minlength: [6, 'Username can not be less than 6 characters'],
        maxlength: [15, 'Username can not be more than 15 characters'],
    },
    password: {
        type: String,
        required: [true,'Password field is required'],
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

const admin = mongoose.model('admin',AdminScheme);
module.exports = admin;