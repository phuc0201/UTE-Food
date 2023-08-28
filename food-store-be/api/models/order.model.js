const date = new Date(Date.now());
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const dateNow = `${year}-${month}-${day}`
module.exports = (sequelize, Sequelize, DataTypes) => {
    const order = sequelize.define(
        'orders',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            full_name: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            phone_number:{
                type: DataTypes.STRING
            },
            delivery_date:{
                type: DataTypes.STRING,
                defaultValue: null
            }
        }
    )
    return order;
}