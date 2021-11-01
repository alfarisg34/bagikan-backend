const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const postRoutes = require('./postRoutes')
const feedbackRoutes = require('./feedbackRoutes')
const likeRoutes = require('./likeRoutes')

module.exports = [
  authRoutes,
  userRoutes,
  adminRoutes,
  postRoutes,
  feedbackRoutes,
  likeRoutes
]
