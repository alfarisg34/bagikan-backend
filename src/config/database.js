const mongoose = require('mongoose')

module.exports = async (next) => {
  try {
    const connectionString =
      process.env.DB_URI ||
      `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`

    await mongoose.connect(connectionString)
    console.log(`Database ${process.env.DB_NAME} is now connected!`)
    next()
  } catch (err) {
    console.log(err)
  }
}
