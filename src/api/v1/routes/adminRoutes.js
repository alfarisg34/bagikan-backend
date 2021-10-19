const { adminController,authController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')

const router = Router()

router.post('/login/admin', adminController.login)
router.post('/token', authController.refreshToken)
router.post('/delete/user',verifyToken, adminController.deleteUser)
router.post('/delete/post',verifyToken, adminController.deletePost)

module.exports = router
