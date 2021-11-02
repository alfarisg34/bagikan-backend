const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  userId:String,
  postId:String,
  status:{
    type:Boolean,
    default:1,
},
  created_at:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('Like', likeSchema)
