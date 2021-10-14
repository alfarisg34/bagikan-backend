const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

//create user Schema & model
const UserScheme = new Scheme({
    username:{
        type:String,
        required: [true,'Username field is required'],
        unique:true,
        lowercase: true,
        minlength: [6, 'Username can not be less than 6 characters'],
        maxlength: [15, 'Username can not be more than 15 characters'],
    },
    email: {
        type: String,
        required: [true,'Email field is required'],
        unique:true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        minlength: [6, 'Password can not be less than 6 characters'],
        maxlength: [15, 'Password can not be more than 15 characters'],
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

UserSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 12)
    this.password = hashedPassword
    next()
  })
  
const User = mongoose.model('user',UserScheme);
module.exports = User;