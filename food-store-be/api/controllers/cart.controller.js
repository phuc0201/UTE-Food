const db = require('../models/index');
module.exports = {
    findByUID: (req, res)=>{
        db.cart.findAll({
            where : {
                userID: req.UID
            },
            attributes: {exclude: ['userID']}
        })
        .then(async(data)=>{
            if(!data)
            {
                return res.status(404).send({
                    message: 'not found'
                })  
            }
            else{
                let product_name, price;
                for(let item = 0; item < data.length; item++){
                    await db.product.findByPk(data[item].dataValues.productID)
                    .then(product=>{
                        product_name = product.dataValues.product_name;
                        price = product.dataValues.price;
                    })
                    let product_images = await db.product_images.findAll({ where : {productID : data[item].dataValues.productID},
                        attributes: { exclude: ["id", "productID"] }
                    })
        
                    data[item].dataValues.product_name = product_name;
                    data[item].dataValues.price = price;
                    data[item].dataValues.image = product_images.length > 0 ? data[item].dataValues.image = product_images[0].dataValues.image : ''
                }
                
                return res.status(200).send(data)
            }
        })
        .catch(err =>{
            return res.status(500).send({message: err})
        })
    },
    addToCart: async(req, res)=>{
        const {productID, quantity} = req.body;
        let cart_item = await db.cart.findOne({
            where : {
                productID : productID,
                userID: req.UID
            }
        })
        let product = await db.product.findByPk(productID)
        if(!product){
            return res.status(400).send({
                message: 'product not found'
            })
        }
        else if(product.quantity - quantity < 0){
            return res.status(400).send({
                message: 'Insufficient quantity'
            })
        } 
        else if(quantity <= 0){
            return res.status(400).send({
                message: "Quantity must be greater than zero!"
            })
        }
        else if(!cart_item){
            db.cart.create({
                userID: req.UID,
                productID: productID,
                quantity: quantity
            })
            .then(()=>{
                return res.status(200).send({
                    message: "add to cart successfully"
                })
            })
            .catch(err => {
                return res.status(500).send({message: err.message})
            })
        }
        else{
            try {
                await product.decrement('quantity', {by: quantity})
                await cart_item.increment('quantity', {by: quantity})

                return res.status(200).send({
                    message: "add to cart successfully"
                })
            } catch (error) {
                return res.status(500).send({
                    message: 'add to card failed'
                })
            }
              
        }
            
    },
    removeCartItem: async(req, res)=>{
        const cartItemID = req.body.cartItemID;
        
    }
}