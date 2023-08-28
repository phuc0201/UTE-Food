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
            image : {
                type: DataTypes.STRING,
                defaultValue: ''
            }
        },
        { timestamps: false }
    );
    return ProductImages;
}