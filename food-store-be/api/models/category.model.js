const db = require('../models/index')
module.exports = (sequelize, Sequelize, DataTypes)=>{
    const Category = sequelize.define(
        "categories", // Model name,
        {
          // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            category_name: {
              type: DataTypes.STRING,
              unique: true
            },
            image : {
              type: DataTypes.STRING,
              defaultValue: ""
            },
            isDelete: {
              type: DataTypes.BOOLEAN,
              defaultValue: false
            }
        }, 
        { timestamps: false }
      );
  
      return Category;
}