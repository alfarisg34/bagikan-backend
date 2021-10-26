const { postController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')

const router = Router()

router.get('/posts', verifyToken, postController.getPost)
router.post('/post/create', verifyToken, postController.createPost)
router.post('/post/update', verifyToken, postController.updatePost)
router.post('/post/like/:id', verifyToken, postController.likePost)

module.exports = router
