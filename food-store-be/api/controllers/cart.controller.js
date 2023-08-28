const db = require('../models/index');
async function removeCartItem(req, res){
    const cartItemID = req.body.cartItemID;
    let cart_item = await db.cart.findByPk(cartItemID);
    if(cart_item){
        db.cart.destroy({
            where : {
                id : cartItemID
            }
        })
        .then(async()=>{
            let product = await db.product.findByPk(cart_item.productID)
            product.increment('quantity', {by: cart_item.quantity})
            return res.status(200).send({
                message: 'Cart item was removed successfully!'
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message
            })
        })
    }
    else{
        return res.status(404).send({
            message: "cart not found"
        })
    }
}
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
                let product_name, price, totalPrice=0;
                for(let item = 0; item < data.length; item++){
                    await db.product.findByPk(data[item].dataValues.productID)
                    .then(product=>{
                        product_name = product.dataValues.product_name;
                        price = product.dataValues.price;
                    })
                    let product_images = await db.product_images.findAll({ where : {productID : data[item].dataValues.productID},
                        attributes: { exclude: ["id", "productID"] }
                    })
                    totalPrice+= price*data[item].quantity
                    data[item].dataValues.product_name = product_name;
                    data[item].dataValues.price = price;
                    data[item].dataValues.image = product_images.length > 0 ? data[item].dataValues.image = product_images[0].dataValues.image : ''
                }
                
                return res.status(200).send({
                    totalPrice: totalPrice,
                    products: data
                })
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
        else if(parseInt(product.quantity) - parseInt(quantity) < 0){
            return res.status(400).send({
                message: 'Insufficient quantity'
            })
        } 
        else if(!cart_item && quantity > 0){
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
        else if(cart_item){
            try {
                if(quantity <= 0){
                    if(parseInt(cart_item.quantity) + parseInt(quantity) > 0){
                        await cart_item.increment('quantity', {by: quantity});
                        await product.decrement('quantity', {by: quantity})
                        return res.status(200).send({
                            message: "item was removed successfully!"
                        })
                    }
                    else{
                        req.body.cartItemID = cart_item.id;
                        removeCartItem(req, res)
                    }
                    
                }
                else{
                    await product.decrement('quantity', {by: quantity})
                    await cart_item.increment('quantity', {by: quantity})
    
                    return res.status(200).send({
                        message: "add to cart successfully"
                    })
                }
            } catch (error) {
                return res.status(500).send({
                    message: 'add to card failed'
                })
            }
              
        }
        else{
            return res.status(400).send({
                message: 'failed'
            })
        }
            
    },
    removeCartItem: async(req, res)=>{
        removeCartItem(req, res)
    }
}