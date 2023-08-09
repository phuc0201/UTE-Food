const db = require('../models/index');
module.exports = {
    findAll : (req, res) => {
        db.product.findAll()
        .then(data =>{
            if (!data) {
                return res.status(400).send({
                    message: "Product not found!"
                });
            }
            return res.status(200).send(data);
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
            .then(()=>{
                return res.status(200).send({
                    message: "Product was created successfully."

                });
            })
            .catch(err =>{
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
    }
}