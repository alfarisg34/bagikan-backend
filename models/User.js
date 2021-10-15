const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

//create user Schema & model
const UserScheme = new Scheme({
    username:{
        type:String,
        required: [true,'Username field is required'],
        unique:true
    },
    email: {
        type: String,
        required: [true,'Email field is required'],
        unique:true
    },
    password: {
        type: String,
        required: [true,'Password field is required'],
    },
    nama : {
        type: String,
    },
    foto_profile:{
        type: String,
    },
    deskripsi:{
        type: String,
    },
    rememberToken:{
        type:String,
    },
    number:{
        type:String,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model('user',UserScheme);
module.exports = User;