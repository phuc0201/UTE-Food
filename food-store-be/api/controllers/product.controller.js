const db = require('../models/index');
const { Sequelize } = require('sequelize')
module.exports = {
    findAll : async (req, res) => {
        await db.product.findAll()
        .then(async (data) =>{
            if (!data) {
                return res.status(400).send({
                    message: "Product not found!"
                });
            }
            for(let prod = 0; prod < data.length; prod ++){
                let starRating = 0
                let point = await db.product_reviews.findAll({
                    where : {productID : data[prod].id},
                    attributes: [ 
                        [Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('starRating'), 'float')), 'starRating']
                    ]
                });
                if(point[0].dataValues.starRating)
                    starRating = point[0].dataValues.starRating 
                let products = await db.product_images.findAll({ where : {productID : data[prod].id},
                    attributes: { exclude: ["id", "productID"] }
                })
                let images = []
                for(let img = 0; img < products.length; img++){
                    images.push(products[img].image)
                }
                data[prod].dataValues.image = images
                data[prod].dataValues.starRating = starRating
            }
            return res.status(200).send(data)   
        })
        .catch(err =>{
            return res.status(500).send({
                message: err.message || 'Failed'
            })
        })
        
    },
    findById : (req, res) =>{
        db.product.findByPk(req.params.id)
        .then(data =>{
            return res.status(200).send(data)
        })
        .catch(err=>{
            return res.status(500).send({
                message: err.message
            })
        })
    },
    findByCategoryID: (req, res)=>{
        db.product.findAll({where : {categoryID : req.params.id}})
        .then(data=>{
            return res.status(200).send(data);
        })
        .catch(err=>{
            return res.status(500).send({
                message: err.message
            })
        })
    },
    create : async (req, res) =>{
        const {categoryID, product_name, description, price, quantity, publication_date} = req.body;
        if(!product_name || !description || !price || !quantity ||
            product_name=='' || description=='' || price=='' || quantity==''){
            return res.status(400).send({
                message: 'Content can not empty'
            })
        }

        const cateID = categoryID ? categoryID : '';
        await db.category.findByPk(cateID)
        .then(async(data)=>{
            if(!data){
                req.body.categoryID = null
            }
            await db.product.create(req.body)
            .then(async (product)=>{
                await db.product_images.create({
                    productID: product.id,
                    image: req.image
                })
                .then(() => {
                    return res.status(200).send({
                        message: "Product was created successfully."
    
                    });
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message })
                })
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the Book."
                });
            })
            
        })
        .catch(err=>{
            return res.status(500).send({
                message : err.message
            })
        })
    },
    update : async (req, res) =>{
        if(!req.body.id){
            db.product.update(req.body, { where: {id: req.params.id} })
            .then(()=>{
                return res.status(200).send({
                    message: 'Product was updated successfully'
                })
            })
            .catch(err =>{
                return res.status(500).send({
                    message: err.message
                })
            })
        }
        else{
            return res.status(400).send({
                message: 'Update failed'
            })
        }
        
    },
    delete : async (req, res) =>{
        const {id, isDelete} = req.body;
        db.product.update({isDelete: isDelete}, { where : {id : id} })
        .then(()=>{
            if(isDelete=='false'){
                return res.status(200).send({ message : 'The product has been successfully restored' })

            }
            else
                return res.status(200).send({
                    message : 'Product was deleted successfully.'
                })
        })
        .catch(err =>{
            return res.status(500).send({
                message: err.message
            })
        })
    },
    addToCategory : async (req, res) =>{
        const cateID = req.body.categoryID;
        db.category.findByPk(cateID)
        .then(async(data)=>{
            if(!data || data['isDelete']){
                return res.status(400).send({
                    message: 'add to category failed'
                })
            }
            else if(!data['isDelete']){
                db.product.update({ categoryID: cateID }, { where: {id: req.params.id} })
                .then(()=>{
                    return res.status(200).send({
                        message: 'add to category successfully'
                    })
                })
                .catch(err =>{
                    return res.status(500).send({
                        message: err.message
                    })
                })
            }
        })
        .catch(err=>{
            return res.status(500).send({
                message: 'add to category failed'
            })
        })
    },
    removeFromCategory : async (req, res) =>{
        db.product.update({ categoryID: null }, { where: {id: req.params.id} })
        .then(()=>{
            return res.status(200).send({
                message: 'remove from category successfully'
            })
        })
        .catch(err =>{
            return res.status(500).send({
                message: err.message
            })
        })
    },
    addNewImage : async (req, res) =>{
        db.product_images.create({
            productID: req.body.productID,
            image: req.image
        })
        .then(()=>{
            return res.status(200).send({
                message: 'add new image successfully'
            })
        })
        .catch(err =>{
            return res.status(500).send({
                message: err.message
            })
        })
    },
    createReview: async (req, res) =>{
        db.product_reviews.create(req.body)
        .then(()=>{
            return res.status(200).send({
                message: "create review successfully"
            })
        })
        .catch((err)=>{
            return res.status(200).send({
                message: err.message || "create review failed"
            })
        })
    },
    updateReview: async (req, res) =>{

    },
    deleteReview: async (req, res) =>{

    },
}