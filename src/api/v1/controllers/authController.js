const { authServices } = require('../services')

exports.register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    await authServices.register(username, email, password)

    return res.status(201).json({
      success: true,
      message: 'User stored successfully!',
    })
  } catch (err) {
    console.log('Errors: ', err)
    const errorMessage = authServices.handleRegistrationErrors(err)

    return res.status(500).json({
      success: false,
      message: 'Failed to register!',
      errors: errorMessage,
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await authServices.login(email, password)
    const [token, refreshToken] = authServices.createTokens(user._id)
    await authServices.saveRefreshToken(refreshToken)

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
