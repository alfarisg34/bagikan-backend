const { User } = require('../models')

exports.getUser = async (req, res) => {
  const user = await User.find()

  res.json(user)
}

exports.getProfile = async (req, res) => {
  const userId = req.user.id
  const user = await User.findOne({ _id: userId })

  res.status(200).json({
    success: true,
    message: 'Successfuly retreived user information!',
    data: user,
  })
}

exports.updateProfile = async (req, res) => {
  const userId = req.user.id
  const data = req.body
  const result = await User.updateOne({ _id: userId }, data)
  res.status(201).json({
    success: true,
    message: 'Successfully updated user!',
    data: result,
  })
}
