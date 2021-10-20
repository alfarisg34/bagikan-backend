const { authServices } = require('../services')
const { User ,Post,Admin} = require('../models')

exports.login = async (req, res) => {
  const { username, password } = req.body
  //hide attribute
  const queryConfig = { password: 0 ,created_at : 0, _id : 0,__v:0}
  try {
    const admin = await authServices.loginAdmin(username, password)
    const [token, refreshToken] = authServices.createTokens(admin._id)
    await authServices.saveRefreshToken(refreshToken)
    const data = await Admin.findOne(admin._id,queryConfig)
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_LIFE,
    })
    res.cookie('refreshToken', token, {
      httpOnly: true,
      maxAge: process.env.REFRESH_TOKEN_LIFE,
    })

    res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      data:data,
      token,
      refreshToken,
    })
  } catch (err) {
    console.log('Errors: ', err)

    res.status(500).json({
      success: false,
      message: 'Failed to login!',
      errors: err,
    })
  }
}

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  try {
    const [newToken, newRefreshToken] = await authServices.refreshAccessToken(
      refreshToken
    )
    await authServices.saveRefreshToken(refreshToken)

    res.status(201).json({
      success: true,
      message: 'Succesfully created new access token!',
      accessToken: newToken,
      refreshToken: newRefreshToken,
    })
  } catch (err) {
    console.log('Errors: ', err)
    res.sendStatus(err)
  }
}

exports.deleteUser = async (req, res) => {
  const userId = req.body.id
  const user = await User.findOneAndDelete({ _id: userId })

  res.status(200).json({
    success: true,
    message: 'Successfuly delete user!',
    data: user,
  })
}

exports.deletePost = async (req, res) => {
  const postId = req.body.id
  const post = await Post.findOneAndDelete({ _id: postId })

  res.status(200).json({
    success: true,
    message: 'Successfuly delete post!',
    data: post,
  })
}