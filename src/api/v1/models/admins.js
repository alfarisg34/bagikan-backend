const mongoose = require('mongoose')
const { isEmail } = require('validator')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username can not be blank'],
    lowercase: true,
    unique: true,
    minlength: [6, 'Username can not be less than 6 characters'],
    maxlength: [16, 'Username can not be more than 16 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email can not be blank'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password can not be blank'],
  },
  firstName : String,
  lastName : String,
  phone : String,
  profilePicture : String,
  verifiedAt : Date
})


module.exports = mongoose.model('Admin', adminSchema)
