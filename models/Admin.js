const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

//create admin Schema & model
const AdminScheme = new Scheme({
    username:{
        type:String,
        required: [true,'adminname field is required'],
        unique:true
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