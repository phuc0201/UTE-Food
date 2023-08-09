const db = require('../models/index')

const date = new Date(Date.now());
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const dateNow = `${year}-${month}-${day}`

module.exports = (sequelize, Sequelize, DataTypes)=>{
    const Product = sequelize.define(
        "products",
        {
            id : {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            categoryID : {
                type: DataTypes.STRING,
                defaultValue : null
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
                type: DataTypes.STRING,
                defaultValue: dateNow
            },
            isDelete : {
                type : DataTypes.BOOLEAN,
                defaultValue : false
            }
        }
    )
    return Product;
}