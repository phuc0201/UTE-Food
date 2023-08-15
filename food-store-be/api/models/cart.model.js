module.exports = (sequelize, Sequelize, DataTypes)=>{
    const Cart = sequelize.define(
        'carts',
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            userID: {
                type: DataTypes.STRING
            },
            productID:{
                type: DataTypes.STRING
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            }
        },
        {
            timestamps: false,
            hooks : {
                beforeCreate: async (cart, options) => {
                    await sequelize.models.products.findOne({
                        where : {
                            id: cart.dataValues.productID
                        }
                    })
                    .then(product => {
                        product.decrement('quantity', {by: cart.quantity})
                    })
                },

            }
        }

    )
    return Cart;
}