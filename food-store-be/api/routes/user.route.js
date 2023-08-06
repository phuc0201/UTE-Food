const userController = require('../controllers/user.controller')
const verify = require('../middlewares/auth').verifyToken_User
const router = require('express').Router()
module.exports = (app) =>{
    // get profile
    router.get("/profile", verify, userController.findByid);
    //update profile
    router.put('/profile', verify, userController.updateProfile)
    app.use('', router)
}