const { postServices } = require('../services')
const { Post,User} = require('../models')

const multer = require('multer')
const fs = require('fs');

exports.getPost = async (req, res) => {
  const post = await Post.find()

  res.json(post)
}
exports.readPostPrivate = async (req, res) => {
  const id = req.user.id
  const queryConfig = { title: 0 ,created_at : 0, description : 0,location:0,category:0,expired:0,created_at:0,like:0,username:0,phone:0,profilePicture:0}
  const post = await Post.find({ userId: id },queryConfig)

  res.status(200).json({
    success: true,
    message: 'Successfuly retreived post information!',
    data: post,
  })
}

exports.read = async (req, res) => {
  //hide attribute
// const queryConfig = { password: 0 ,created_at : 0, _id : 0}
  let ls= Date.now()
  const post = await Post.find()
  .where("expiredDate").gt(ls)
  .sort({"created_at": 1 })

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
  let ts = Date.now();

  try {
    // console.log(req.file)

    const userId = req.user.id
    const user = await User.findOne({ _id: userId })
    const username = user.username
    const profilePicture = user.profilePicture
    const phone = user.phone
    // console.log(user.profilePicture)
    // console.log(ts)
    if(expired =="1 jam"){
      ts = ts + (3600000*1)
    }else if(expired =="6 jam"){
      ts = ts + (3600000*6)
    }else if(expired =="12 jam"){
      ts = ts + (3600000*12)
    }else if(expired =="1 hari"){
      ts = ts + (3600000*24)
    }else if(expired =="3 hari"){
      ts = ts + (3600000*72)
    }else if(expired =="1 minggu"){
      ts = ts + (3600000*168)
    }else{
      return res.status(500).json({
        success: false,
        message: 'Input expired salah',
      })
    }
    // console.log(ts)
    const expiredDate = new Date(ts)
    // console.log(expiredDate)
    // const expiredDate = Date.now + expired
    let picture = req.file['filename']
    
    await postServices.create(title,description,location,category,expired,picture,userId,username,profilePicture,phone,expiredDate)

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
  const postId = req.params.id
  const { title,description,location,category,expired } = req.body
  const post = await Post.findById(postId)
  // console.log(post)
  // console.log(req.body)
  let picture;
  if(req.file){
    if (post.picture !== 'pict.jpg') {
      fs.unlinkSync(`./src/api/v1/uploads/post/${post.picture}`);
  }
    picture = req.file['filename']
  }
  try {
    const result = await post.updateOne({
      title: title,
      description: description,
      location: location,
      category: category,
      expired: expired,
      picture: picture,
  });
    res.status(201).json({
      success: true,
      message: 'Successfully updated post!',
      data: result,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
  });
  }
  
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
 const queryConfig = { title: 0 ,created_at : 0, description : 0,location:0,category:0,expired:0,created_at:0,like:0,username:0,phone:0,profilePicture:0}
  const post = await Post.find({ userId: userId },queryConfig)

  res.status(200).json({
    success: true,
    message: `Berhasil mendapat kan postingan user dengan id ${userId}`,
    data: post,
  })
}

exports.detail_read_id = async (req, res) => {
//hide attribute
const queryConfig = { password: 0 , _id : 0}

  const postId = req.params.id
  const post = await Post.findOne({ _id :postId},queryConfig)

  res.status(200).json({
    success: true,
    message: 'Successfuly retreived post information!',
    data: post,
  })
}

