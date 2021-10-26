const { userController } = require('../controllers')
const { Router } = require('express')
const { verifyToken } = require('../middlewares')
const multer = require('multer')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// const upload = multer({dest: '../uploads/profilePicture'})

const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, '../uploads/profilePicture');
    },
    filename: function(req, file, next){
        next(null, uuid.v4() + path.extname(file.originalname));
    }
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

router.get('/users', verifyToken, userController.getUser)
router.get('/user/profile', verifyToken, userController.getProfilePrivate)
router.get('/user/:id', userController.getProfilePublic)
router.post('/user/profile/update', multipartMiddleware,upload.single('profilePicture'),verifyToken, userController.updateProfile)

module.exports = router
