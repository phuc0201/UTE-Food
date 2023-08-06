const db = require('../models/index')
module.exports = (sequelize, Sequelize, DataTypes)=>{
    const Product = sequelize.define(
        "product",
        {
            id : {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            categoryID : {
                type: DataTypes.STRING,
                defaultValue : ''
            },
            product_name : {
                type : DataTypes.STRING,
                defaultValue : 'product name'
            },
            description : {
                type : DataTypes.STRING,
                defaultValue : ''
            },
            price : {
                type: DataTypes.INTEGER,
                defaultValue : 1
            },
            quantity : {
                type : DataTypes.INTEGER,
                defaultValue : 1
            },
            publication_date:{
                type: DataTypes.STRING
            },
            isDelete : {
                type : DataTypes.BOOLEAN,
                defaultValue : false
            }
        }
    )
}