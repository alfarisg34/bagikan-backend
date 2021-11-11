const { User,Post,Feedback } = require('../models')
const multer = require('multer')
const imgbbUploader = require("imgbb-uploader");
// const upload = multer({dest: '../uploads/profilePicture'})
const fs = require('fs');
const { response } = require('express');

//hide attribute
const queryConfig = { password: 0 ,created_at : 0}

exports.getUser = async (req, res) => {
  const user = await User.find()

  res.json(user)
}

exports.getProfilePrivate = async (req, res) => {
  const userId = req.user.id
  const user = await User.findOne({ _id: userId },queryConfig)

  res.status(200).json({
    success: true,
    message: 'Successfuly retreived user information!',
    data: user,
  })
}

exports.getProfilePublic = async (req, res) => {
  const id = req.params.id
  const user = await User.findOne({ _id: id },queryConfig)

  res.status(200).json({
    success: true,
    message: 'Successfuly retreived user information!',
    data: user,
  })
}

exports.getProfile = async (req, res) => {
  const userId = req.user.id
  const user = await User.findOne({ _id: userId },queryConfig)

  res.status(200).json({
    success: true,
    message: 'Successfuly retreived user information!',
    data: user,
  })
}

exports.updateProfile = async (req, res) => {
  const userId = req.user.id
  const user = await User.findOne({ _id: userId })
  const{
    name,
    description,
    phone,
  } = req.body;

  // console.log(process.env.IMGBB_API)
  let profilePicture;
  
    imgbbUploader(process.env.IMGBB_API, `./src/api/v1/uploads/profilepicture/${req.file['filename']}`)
    .then(async(response) => {
      if(req.file){
        if(user.profilePicture !== 'default.jpg'){
          // fs.unlinkSync(`./src/api/v1/uploads/profilepicture/${user.profilePicture}`);
      }
      profilePicture = response['display_url']
    }
    const post = await Post.updateMany({ userId: userId }, {$set: {profilePicture: profilePicture}})
    await Post.updateMany({ userId: userId }, {$set: {phone: phone}})
    const feedback = await Feedback.updateMany({ userId: userId }, {$set: {profilePictureSender: profilePicture}})
      const result = await user.updateOne({ 
        name: name,
        description: description,
        phone: phone,
        profilePicture: profilePicture, 
      })
      res.status(201).json({
        success: true,
        message: 'Successfully updated user!',
        data: result,
      })
    })
    .catch((error) => console.error(error));
  
}
