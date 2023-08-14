const router = require("express").Router();
const multer = require('multer');
const user_controller = require('../controllers/user.controller')
const categoryController = require('../controllers/category.controller')
const productController = require('../controllers/product.controller')
const uploadImg = require('../middlewares/uploadImg')
const verify = require('../middlewares/auth').verifyToken_Admin
const upload = multer({
    storage: multer.memoryStorage()
})
module.exports = (app)=>{
    router.get('/users', user_controller.findAll);
    //CATEGORIES
    // create cate
    router.post('/categories', upload.single('file'), uploadImg.uploadImgToFirebase, categoryController.create) 
    // update cate
    router.put('/categories/:id', upload.single('file'), uploadImg.uploadImgToFirebase, categoryController.update)
    //delete cate
    router.delete('/categories', categoryController.delete)

    //PRODUCTS
    //find by id
    router.get('/product/:id', productController.findById)
    //find all
    router.get('/product', productController.findAll)
    //find by cateID
    router.get('/product/categories/:id', productController.findByCategoryID)
    //create
    router.post('/product', upload.single('file'), uploadImg.uploadImgToFirebase,productController.create);
    //update
    router.put('/product/:id',  productController.update);
    //delete 
    router.delete('/product', productController.delete)
    // add new image
    router.post('/product/add-new-image', upload.single('file'), uploadImg.uploadImgToFirebase, productController.addNewImage);
    // create review
    router.post('/product/review', productController.createReview);
    //add to category
    router.post('/categories/product/:id', productController.addToCategory)
    //remove from category
    router.delete('/categories/product/:id', productController.removeFromCategory)
    app.use('/admin', verify, router);
}