const { userController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')

const uuid = require('uuid');
const multer = require('multer')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const path = require('path');
// const upload = multer({dest: '/'})

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/api/v1/uploads/profilepicture');
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

// console.log(upload)
const router = Router()

router.get('/users', verifyToken, userController.getUser)
router.get('/user/profile', verifyToken, userController.getProfilePrivate)
router.get('/user/:id', userController.getProfilePublic)
router.post('/user/profile/update',upload.single('profilePicture'),verifyToken, userController.updateProfile)

module.exports = router
