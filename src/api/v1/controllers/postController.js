const { postServices } = require('../services')
const { Post,User} = require('../models')

const multer = require('multer')
const fs = require('fs');

exports.getPost = async (req, res) => {
  const post = await Post.find()

  res.json(post)
}

exports.read = async (req, res) => {
  //hide attribute
// const queryConfig = { password: 0 ,created_at : 0, _id : 0}

  const post = await Post.find().sort({"created_at": 1 })

  post.forEach(async(record)=>{
    // Do whatever processing you want
    let userId = record.userId
    const user = await User.find({_id:userId})
    res.json(user)
});
  res.json(post)
}

exports.createPost = async (req, res) => {
  const { title,description,location,category,expired } = req.body

  try {
    // console.log(req.file)

    const userId = req.user.id
    const user = await User.findOne({ _id: userId })
    const username = user.username
    const profilePicture = user.profilePicture
    // console.log(user.profilePicture)
    // const expiredDate = Date.now + expired
    // delete req.headers['content-type'];
    let picture = req.file['filename']
    
    await postServices.create(title,description,location,category,expired,picture,userId,username,profilePicture)

    return res.status(201).json({
      success: true,
      message: 'Post stored successfully!',
    })
  } catch (err) {
    console.log('Errors: ', err)
    const errorMessage = postServices.handleRegistrationErrors(err)

    return res.status(500).json({
      success: false,
      message: 'Failed to create post!',
      errors: errorMessage,
    })
  }
}

exports.updatePost = async (req, res) => {
  const postId = req.body.id
  const data = req.body
  const result = await Post.updateOne({ _id: postId }, data)
  res.status(201).json({
    success: true,
    message: 'Successfully updated post!',
    data: result,
  })
}

exports.likePost = async (req, res) => {
  const postId = req.params.id
  const userLike = req.user.id
  const post = await Post.findOne({ _id: postId })
  console.log(post)
  post.like = post.like + 1
  post.save()

  res.status(201).json({
    success: true,
    message: 'Successfully like post!',
    data: post,
  })
}

exports.read_id = async (req, res) => {
  
  const userId = req.params.id
  //hide attribute
 const queryConfig = { title: 0 ,created_at : 0, description : 0,userId:0,location:0,category:0,expired:0,created_at:0,like:0}
  const post = await Post.find({ where: function(){
    return (this.userId == userId)
  }},queryConfig)

  res.status(200).json({
    success: true,
    message: `Berhasil mendapat kan postingan user dengan id ${userId}`,
    data: post,
  })
}

exports.detail_read_id = async (req, res) => {
//hide attribute
const queryConfig = { password: 0 ,created_at : 0, _id : 0}

  const postId = req.params.id
  const post = await Post.findOne({ _id :postId},queryConfig)

  res.status(200).json({
    success: true,
    message: 'Successfuly retreived post information!',
    data: post,
  })
}

