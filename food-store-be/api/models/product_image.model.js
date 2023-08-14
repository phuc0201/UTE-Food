module.exports =  (sequelize, Sequelize, DataTypes)=>{
    const ProductImages = sequelize.define(
        'product_images',
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
            image : {
                type: DataTypes.STRING,
                defaultValue: ''
            }
        },
        { timestamps: false }
    );
    return ProductImages;
}