const { postController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')

const uuid = require('uuid');
const multer = require('multer')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/api/v1/uploads/post');
    },
    filename: function(req, file, cb){
        cb(null, uuid.v4() + path.extname(file.originalname));
    },
    
});


const fileFilter = (req, file, next)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        next(null, true);
    }else{
        next(new Error('Please only upload jpeg, jpg, and png'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const router = Router()

router.get('/posts', verifyToken, postController.getPost)
router.post('/post/create',upload.single('picture'), verifyToken, postController.createPost)
router.post('/post/update', upload.single('picture'),verifyToken, postController.updatePost)
router.post('/post/like/:id', verifyToken, postController.likePost)

module.exports = router
