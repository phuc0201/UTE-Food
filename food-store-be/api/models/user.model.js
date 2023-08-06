module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
      "users", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        full_name: {
          type: DataTypes.STRING,
          defaultValue: 'tên'
        },
        phone_number: {
            type: DataTypes.STRING,
            defaultValue: '0987654321'
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: 'địa chỉ'
        },
        date_of_birth: {
            type: DataTypes.STRING,
            defaultValue: '2002-1-2'
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'avatar'
        },
        email: {
          type: DataTypes.STRING,
          unique: true
        },
        password: {
          type: DataTypes.STRING
        },
        user_role: {
          type: DataTypes.STRING,
          defaultValue: 'user'
        },
      }
    );
  
    return User;
  };
  