const { User } = require('../models')
const multer = require('multer')
// const upload = multer({dest: '../uploads/profilePicture'})
const fs = require('fs');

//hide attribute
const queryConfig = { password: 0 ,created_at : 0, _id : 0}

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

  console.log(req.file['filename'])
  let profilePicture;
  if(req.file){
    // if(user.profilePicture !== 'profilePicture.jpg'){
    //     fs.unlinkSync(`./src/api/v1/uploads/profilepicture/${user.profilePicture}`);
    // }
    profilePicture = req.file['filename']
  }
  // console.log(user)
  try{
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
}
  catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
  });
  }
  
}
