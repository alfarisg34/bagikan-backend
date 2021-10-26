const { feedbackController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')

const router = Router()

router.get('/feedback/:id', verifyToken, feedbackController.getFeedbackByUser)
router.post('/feedback/create/:id', verifyToken, feedbackController.createFeedback)
router.post('/feedback/update/:id', verifyToken, feedbackController.updateFeedback)
router.delete('/feedback/delete/:id', verifyToken, feedbackController.deleteFeedback)

module.exports = router
