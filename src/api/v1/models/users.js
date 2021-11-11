const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
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
    minlength: [6, 'Password can not be less than 6 characters'],
    maxlength: [24, 'Password can not be more than 24 characters'],
    required: [true, 'Password can not be blank'],
  },
  name : String,
  profilePicture: {
    type: String,
    default: 'https://i.ibb.co/Cb66LM8/a924948ab119.jpg',
  },
  description : String,
  phone: {
    type: String,
    minlength: [10, 'Phone can not be less than 10 characters'],
    maxlength: [16, 'Phone can not be more than 16 characters'],
  },
  verifiedAt: Date,
  created_at:{
    type:Date,
    default:Date.now
  }
})

userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12)
  this.password = hashedPassword
  next()
})

module.exports = mongoose.model('User', userSchema)
