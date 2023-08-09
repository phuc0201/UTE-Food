const router = require("express").Router();
const multer = require('multer');
const user_controller = require('../controllers/user.controller')
const categoryController = require('../controllers/category.controller')
const uploadImg = require('../middlewares/uploadImg')
const verify = require('../middlewares/auth').verifyToken_Admin
const upload = multer({
    storage: multer.memoryStorage()
})
module.exports = (app)=>{
    router.get('/users', user_controller.findAll);
    router.post('/categories', upload.single('file'), uploadImg.uploadImgToFirebase, categoryController.create) 
    app.use('/admin', verify, router);
}