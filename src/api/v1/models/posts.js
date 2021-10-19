const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title can not be blank'],
    maxlength: [15, 'Title can not be more than 15 characters'],
  },
  description : {
    type: String,
    required: [true, 'Description can not be blank'],
    maxlength: [255, 'Title can not be more than 255 characters'],
  },
  like: {
    type: String,
  },
  picture: String,
  location : String,
  category: String,
  expired : String,
  created_at:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('Post', postSchema)
