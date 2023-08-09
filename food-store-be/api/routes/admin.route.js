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
    // create cate
    router.post('/categories', upload.single('file'), uploadImg.uploadImgToFirebase, categoryController.create) 
    // update cate
    router.put('/categories', upload.single('file'), uploadImg.uploadImgToFirebase, categoryController.update)
    //delete cate
    router.delete('/categories', categoryController.delete)
    app.use('/admin', verify, router);
}