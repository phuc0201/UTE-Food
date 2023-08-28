
const db = require('../models/index');

module.exports = {
    findAll : (req, res) => {
        db.category.findAll()
        .then(async(data) => {
            if (!data) {
                return res.status(400).send({
                    message: "Category not found!"
                });
            }
            else{
                for( let item = 0; item  < data.length; item++ ){
                    let quantityOfProduct = await db.product.findAndCountAll({where : {categoryID : data[item].id}});
                    data[item].dataValues.product_quantity = quantityOfProduct ? quantityOfProduct.count : 0
                }
                return res.status(200).send(data);
            }
        })
        .catch(err =>{
            return res.status(500).send({
                message: err || 'Failed'
            })
        })
        
    },
    findById : (req, res)=>{
        db.category.findByPk(req.params.id)
        .then(data =>{
            return res.status(200).send(data)
        })
        .catch(err=>{
            return res.status(500).send({
                message: "find by id failed"
            })
        })
    },
    create : (req, res) => {
        if (!req.body.category_name) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        const category = {
            category_name: req.body.category_name,
            image: req.image
        };

        db.category.findOne({where: {category_name: category.category_name}})
        .then(data => {
            if (data) {
                res.status(400).send({
                    message: "Category already exists!"
                });
            } else {
                db.category.create(category)
                .then(data => {
                    res.status(200).send({
                        message: "Category was created successfully."
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Category."
                    });
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Category."
            });
        });
    },
    update : (req, res) =>{
        const image = req.image ? req.image : '';
        const category_name = req.body.category_name;
        const id = req.params.id;
        const newCategory = { 
            category_name
        }
        if(image!=''){
            newCategory.image = image
        }

        db.category.update(newCategory, { where : {id : id} })
        .then(()=>{
            return res.status(200).send({
                message : 'Category was updated successfully.'
            })
        })
        .catch(err =>{
            return res.status(500).send({
                message: err
            })
        })
    },
    delete : (req, res) =>{
        const {id, isDelete} = req.body;
        db.category.update({isDelete: isDelete}, { where : {id : id} })
        .then(()=>{
            if(isDelete=='false'){
                return res.status(200).send({ message : 'The category has been successfully restored' })

            }
            else
                return res.status(200).send({
                    message : 'Category was deleted successfully.'
                })
        })
        .catch(err =>{
            return res.status(500).send({
                message: err.message
            })
        })
    }
}