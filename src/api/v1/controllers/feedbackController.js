const { feedbackServices } = require('../services')
const { Feedback,User} = require('../models')

exports.getFeedbackByUser = async (req, res) => {
  const feedback = await Feedback.find()

  res.json(feedback)
}

exports.createFeedback = async (req, res) => {
  const { description } = req.body

  try {
    const idReceiver = req.params.id
    const idSender = req.user.id
    const data = await feedbackServices.create(description,idSender,idReceiver)

    return res.status(201).json({
      success: true,
      message: 'Feedback stored successfully!',
      data:data
    })
  } catch (err) {
    console.log('Errors: ', err)
    const errorMessage = feedbackServices.handleRegistrationErrors(err)

    return res.status(500).json({
      success: false,
      message: 'Failed to create feedback!',
      errors: errorMessage,
    })
  }
}

exports.updateFeedback = async (req, res) => {
  const feedbackId = req.params.id
  const data = req.body
  const result = await Feedback.updateOne({ _id: feedbackId }, data)
  res.status(201).json({
    success: true,
    message: 'Successfully updated feedback!',
    data: result,
  })
}

exports.deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id
  const feedback = await Feedback.findOneAndDelete({ _id: feedbackId })

  res.status(200).json({
    success: true,
    message: 'Successfuly delete feedback!',
    data: feedback,
  })
}

