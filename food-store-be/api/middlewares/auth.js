const auth = require('../config/authToken.config')
const jwt = require('jsonwebtoken')
module.exports = {
    verifyToken_Admin : (req, res, next) => {
        let token = req.headers.authorization
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }
        jwt.verify(token, auth.secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            if(decoded.role != "admin"){
                return res.status(403).send({
                    message: 'Required Admin Role!'
                })
            }
            req.role = decoded.role;
            req.UID = decoded.UID;
            next();
        });
    },
    verifyToken_User : (req, res, next) => {
        let token = req.headers.authorization
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }
        jwt.verify(token, auth.secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.UID = decoded.UID;
            next();
        });
    }
}