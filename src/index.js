const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const config = require('./config')
const routes = require('./api/v1/routes')
const multer = require("multer")
const cors = require("cors")
const path = require('path')

const app = express()

// Setting up environment variables
dotenv.config()
const port = process.env.PORT || 8090

// Database connection
config.database(() => {
  app.listen(port, () => {
    console.log(`Listening on port:${port}`)
  })
})

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads/post', express.static(path.join(__dirname, 'api/v1/uploads/post')));
app.use('/uploads/profilepicture', express.static(path.join(__dirname, 'api/v1/uploads/profilepicture')));
// console.log(__dirname)
// app.use(express.static('uploads'))

// Importing routes
app.get('/api', (req, res) => {
  res.send('You are connected to APIs!')
})
routes.forEach((route) => app.use('/api', route))
