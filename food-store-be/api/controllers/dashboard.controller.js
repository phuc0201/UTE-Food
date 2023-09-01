const db = require('../models/index')

module.exports = {
    dashboard: async (req,res)=>{
        try {
            const topSellingProduct = await db.order_detail.findAll({
                attributes:['productID',
                    [db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'totalQuantity']
                ],
                group: ['productID'],
                order: [[db.Sequelize.literal('totalQuantity'), 'DESC']], 
                limit: 5 
            })
            .then(async(data)=>{
                let products = []
                await data.map(async(top_product)=>{
                    products.push(await db.product.findOne({
                        where: {
                            id: top_product.productID
                        },
                        attributes: ['id', 'product_name', 'price'],
                        include: [
                            {
                                model: db.product_images,
                                attributes: ['image'],
                            }
                        ]
                    }))
                })
                return products;
            })
            let total_product = await db.product.count()
            let total_user = await db.user.count()
            let dailyOrderCount = await db.order.findAll({
                attributes: [
                    [db.Sequelize.fn('DATE', db.Sequelize.col('createdAt')), 'orderDate'],
                    [db.Sequelize.fn('COUNT', 'id'), 'totalOrders']
                ],
                group: ['orderDate'],
                order: [[db.Sequelize.literal('orderDate'), 'ASC']], 
                raw: true
            })
            let user_orders = await db.order.findAll({
                attributes: [
                    [db.Sequelize.fn('COUNT', 'id'), 'totalOrders']
                ],
                include: [
                    {
                        model: db.user,
                        attributes: ['id']
                    }
                ],
                group: ['userID']
            });
            db.order.findAll({
                include: [
                    {
                        model: db.order_detail,
                        include: [
                        {
                            model: db.product,
                            attributes: ['price'],
                        }
                      ]
                    },
                ],
            })
            .then(orders => {
                const ordersWithTotalPrice = ()=>{
                    let totalOrderPrice = 0;
                    orders.map(order => {
                        totalOrderPrice += order.order_details.reduce((total, orderDetail) => {
                            const productPrice = orderDetail.product.price;
                            const quantity = orderDetail.quantity;
                            return total + productPrice * quantity;
                        }, 0);
                    });
                    return totalOrderPrice;
                }
                
                return res.status(200).send({
                    total_product: total_product,
                    total_price_orders: ordersWithTotalPrice(),
                    total_user: total_user,
                    totalOrdersWithUser: user_orders,
                    dailyOrderCount: dailyOrderCount,
                    topSellingProduct: topSellingProduct
                });
            })
            .catch(err => {
                return res.status(500).send(err.message)
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    },
}