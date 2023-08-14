module.exports =  (sequelize, Sequelize, DataTypes)=>{
    const ProductReview = sequelize.define(
        'product_reviews',
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            productID: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            userID: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            starRating : {
                type: DataTypes.STRING,
                defaultValue: 0
            },
            content: {
                type: DataTypes.STRING,
                defaultValue: ''
            }
        }
    );
    return ProductReview;
}