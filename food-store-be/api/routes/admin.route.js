const router = require("express").Router();
const user_controller = require('../controllers/user.controller')
const verify = require('../middlewares/auth').verifyToken_Admin
module.exports = (app)=>{
    router.get('/users', user_controller.findAll);
    app.use('/admin', verify, router);
}