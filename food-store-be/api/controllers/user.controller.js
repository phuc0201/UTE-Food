const db = require("../models/index");
const jwt = require('jsonwebtoken');
const auth = require('../config/authToken.config')
module.exports = {
    findAll : (req, res) => {
        db.user.findAll({ attributes: { exclude: ["password"] } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
    },
    findByid : (req, res)=>{
        const id = req.UID;
        db.user.findByPk(id,{ attributes: { exclude: ["password"] } })
        .then(data => {
            if(!data){
                return res.status(404).send({
                    message: "not found profile"
                })
            }
            return res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user"
            });
        });
    },
    signin : (req, res) =>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send({
                message: 'Content can be not empty'
            })
        }
        else{
            const user = {
                email: req.body.email,
                password: req.body.password
            }
            db.user.findOne({where: {email: user.email}})
            .then(data =>{
                if(!data){
                    return res.status(404).send({
                        message: "User not found!"
                    })
                }
                else if(data.password == user.password){
                    const payload = { UID: data.id, role: data.user_role };
                    const secret = auth.secretKey;
                    const options = { expiresIn: 60*60*24 };
                    const token = jwt.sign(payload, secret, options);
                    return res.status(200).send({
                        authToken: token
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while find the user."
                });
            });
        }
    },
    signup : (req, res) => {
        const user = {
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            address : req.body.address,
            date_of_birth : req.body.date_of_birth,
            avatar : req.body.avatar,
            email : req.body.email,
            password : req.body.password,
            user_role : 'user',
        }
        db.user.create(user)
        .then(() => {
            res.status(200).send({
                message: "User was registered successfully!"
            });
        })
        .catch(() => {
            res.status(500).send({
                message: "Some error occurred while creating the user."
            });
        });
        
    },
    updateProfile : (req, res) => {
        if (!req.body) {
            return res.status(400).send({
              message: "Content can not be empty!"
            });
        }
        db.user.update({
            full_name: req.body.full_name,
            phone_number : req.body.phone_number,
            address : req.body.address,
            date_of_birth: req.body.date_of_birth,
        }, {
            where: {
                id: req.UID
            }
        })
        .then(() => {
            return res.status(200).send({
                message: "User was updated successfully!"
            });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Some error occurred while updating the user."
            });
        });
    },
    changePassword : async (req,res)=>{
        const { oldPassword, newPassword } = req.body;
        const userId = req.UID;
      
        // Check if required data is provided
        if (!oldPassword || !newPassword) {
          return res.status(400).send({ message: "Old password and new password are required." });
        }
      
        try 
        {
            // Find user by id from database
            const user = await db.user.findByPk(userId);
      
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
      
            // Check if old password is correct
            // const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
            // if (!isPasswordCorrect) {
            //     return res.status(401).send({ message: "Invalid old password." });
            // }
      
            // Hash new password and update in database
            // const salt = bcrypt.genSaltSync(7);
            // const hashPass = bcrypt.hashSync(newPassword, salt);
            if(user.password == oldPassword){
                await db.user.update({ password: newPassword }, { where: { id: userId } });
                return res.status(200).send({ message: "Password updated successfully." });
            }
            else{
                return res.status(401).send({ message: "Invalid old password." });
            }
        } 
        catch (error) {
            return res.status(500).send({ message: "An error occurred while updating password." });
        }
    }
}