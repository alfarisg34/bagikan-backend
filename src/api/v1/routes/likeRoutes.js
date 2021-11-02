const { likeController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')

const router = Router()

router.post('/post/like/:id', verifyToken, likeController.like)
router.post('/post/dislike/:id', verifyToken, likeController.dislike)


module.exports = router
