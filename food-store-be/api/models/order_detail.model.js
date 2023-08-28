module.exports = (sequelize, Sequelize, DataTypes) => {
    const order_detail = sequelize.define(
        'order_details',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            quantity: {
                type: DataTypes.INTEGER
            }
            
        },
        {timestamps: false}
    )
    return order_detail;
}