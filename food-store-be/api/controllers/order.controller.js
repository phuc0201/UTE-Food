const db = require('../models/index')
module.exports = {
    create: async (req, res)=>{
        let {full_name, address, phone_number} = req.body;
        let userID = req.UID;
        let products = await db.cart.findAll({ where: {userID: userID} })
        if( !full_name || !address || !phone_number || full_name == '' || address == '' || phone_number == ''){
            return res.status(400).send({
                message: "bad request!"
            })
        }
        else if(products.length == 0){
            return res.status(400).send({
                message: 'cart is empty'
            })
        }
        else{
            db.order.create({
                userID,
                full_name,
                address,
                phone_number
            })
            .then(async(order)=>{
                if(!order)
                    return res.status(400).send({ message: 'failed' })
                try {
                    for(let prod = 0; prod < products.length; prod++){
                        await db.order_detail.create({
                            orderID: order.id,
                            productID: products[prod].productID,
                            quantity: products[prod].quantity
                        })
                        await db.cart.destroy({
                            where : {
                                productID: products[prod].productID,
                                userID: userID
                            }
                        })
                    }
                    return res.status(200).send({
                        message: 'Order has been created'
                    })
                } catch (error) {
                    return res.status(500).send({
                        message: error
                    })
                }
            })
            .catch(err=>{
                return res.status(500).send({
                    message: err.message
                })
            })
        }
    },
    delete: (req, res)=>{

    },
    getAllOrder: (req, res)=>{
        db.order.findAll()
        .then(data => {
            return res.status(200).send(data)
        })
        .catch(err => {
            return res.status(500).send(err.message)
        })
    },
    getOrderByUID: (req, res)=>{
        db.order.findAll({
            where : {
                userID: req.UID
            },
            include: [
                {
                  model: db.order_detail,
                  include: [
                    {
                        model: db.product,
                        attributes: ['product_name', 'price'],
                        include: [
                            {
                                model: db.product_images,
                                attributes: ['image']
                            }
                        ]
                    }
                  ]
                },
            ],
        })
        .then(orders => {

            const ordersWithTotalPrice = orders.map(order => {
                const totalOrderPrice = order.order_details.reduce((total, orderDetail) => {
                    const productPrice = orderDetail.product.price;
                    const quantity = orderDetail.quantity;
                    return total + productPrice * quantity;
                }, 0);

                return {
                    ...order.toJSON(),
                    totalOrderPrice
                };
            });

            return res.status(200).send(ordersWithTotalPrice);
        })
        .catch(err => {
            return res.status(500).send(err.message)
        })
    }
}