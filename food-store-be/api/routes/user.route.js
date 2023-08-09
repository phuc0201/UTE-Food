const userController = require('../controllers/user.controller')
const categoryController = require('../controllers/category.controller')
const productController = require('../controllers/product.controller')
const verify = require('../middlewares/auth').verifyToken_User
const router = require('express').Router()

module.exports = (app) =>{
    router.get("/profile", userController.findByid);
    router.put('/profile', userController.updateProfile);
    //CATEGORY
    router.get("/categories", categoryController.findAll);
    router.get("/categories/:id", categoryController.findById);
    //PRODUCT
    router.get('/product', productController.findAll)
    //find by cateID
    router.get('/product/categories/:id', productController.findByCategoryID)
    app.use('', verify,router)
}