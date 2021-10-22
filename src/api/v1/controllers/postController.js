const { postServices } = require('../services')
const { Post} = require('../models')

exports.getPost = async (req, res) => {
  const post = await Post.find()

  res.json(post)
}

exports.createPost = async (req, res) => {
  const { title,description,location,category,expired,picturePost } = req.body

  try {
    await postServices.create(title,description,location,category,expired,picturePost)

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

