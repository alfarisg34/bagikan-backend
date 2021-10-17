const { adminController,authController } = require('../controllers')
const { Router } = require('express')

const router = Router()

router.post('/login/admin', adminController.login)
router.post('/token', authController.refreshToken)

module.exports = router
