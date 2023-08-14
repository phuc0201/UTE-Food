const userController = require('../controllers/user.controller')
const categoryController = require('../controllers/category.controller')
const productController = require('../controllers/product.controller')
const cartController = require('../controllers/cart.controller')
const verify = require('../middlewares/auth').verifyToken_User
const router = require('express').Router()

module.exports = (app) =>{
    router.get("/profile", userController.findByid);
    router.put('/profile', userController.updateProfile);
    //CATEGORY
    router.get("/categories", categoryController.findAll);
    router.get("/categories/:id", categoryController.findById);
    //PRODUCT
    router.get('/product', productController.findAll);
    //find by cateID
    router.get('/product/categories/:id', productController.findByCategoryID);

    // CART
    // get cart
    router.get('/cart', cartController.findByUID);
    //add to cart
    router.post('/cart', cartController.addToCart);
    // remove cart item
    router.delete('/cart', cartController.removeCartItem);
    app.use('', verify,router)
}