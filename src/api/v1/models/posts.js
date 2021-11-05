const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title can not be blank'],
    maxlength: [50, 'Title can not be more than 50 characters'],
  },
  description : {
    type: String,
    required: [true, 'Description can not be blank'],
    maxlength: [255, 'Description can not be more than 255 characters'],
  },
  like: {
    type: Number,
    default:0
  },
  username: String,
  userId: String,
  picture: String,
  profilePicture :String,
  location : String,
  category: String,
  expired : String,
  expiredDate : Date,
  phone: {
    type: String,
  },
  created_at:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('Post', postSchema)
