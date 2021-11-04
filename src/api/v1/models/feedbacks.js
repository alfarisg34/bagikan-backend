const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  description : {
    type: String,
    required: [true, 'Description can not be blank'],
    maxlength: [255, 'Description can not be more than 255 characters'],
  },
  idSender: String,
  idReceiver: String,
  usernameSender:String,
  profilePictureSender:String,
  created_at:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('Feedback', feedbackSchema)
