const mongoose = require('mongoose')

module.exports = async (next) => {
  try {
    await mongoose.connect(
      `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
    )
    console.log(`Database ${process.env.DB_NAME} is now connected!`)
    next()
  } catch (err) {
    console.log(err)
  }
}
