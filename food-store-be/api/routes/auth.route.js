const router = require('express').Router();
const userController = require('../controllers/user.controller');

module.exports = (app) => {
    router.post('/signin', userController.signin)
    router.post('/signup',require("../middlewares/validateInfor").registerValidator, userController.signup)
    router.put("/changepassword", require('../middlewares/auth').verifyToken_User, userController.changePassword);
    app.use('/auth', router)
}