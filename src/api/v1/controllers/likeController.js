const { postServices } = require('../services')
const { Post,User} = require('../models')

exports.getPost = async (req, res) => {
  const post = await Post.find()

  res.json(post)
}

exports.createPost = async (req, res) => {
  const { title,description,location,category,expired,picturePost } = req.body

  try {
    const userId = req.user.id
    const user = await User.findOne({ _id: userId })
    const username = user.username
    await postServices.create(title,description,location,category,expired,picturePost,username)

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

