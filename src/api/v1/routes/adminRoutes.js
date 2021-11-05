const { adminController,authController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')

const router = Router()

router.post('/login/admin', adminController.login)
router.post('/token', authController.refreshToken)
router.delete('/delete/user/:id',verifyToken, adminController.deleteUser)
router.delete('/delete/post/:id',verifyToken, adminController.deletePost)

module.exports = router
