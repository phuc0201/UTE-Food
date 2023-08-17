const { Sequelize, DataTypes, Op } = require("sequelize");
const config = require("../config/database.config");

const sequelize = new Sequelize(
    config.db.DB_NAME,
    config.db.DB_USER,
    config.db.DB_PASS,
    {
      host: config.db.DB_HOST,
      dialect: config.db.dialect,
      operatorsAliases: 0,
  
      poll: {
        max: config.db.pool.max,
        min: config.db.pool.min,
        acquire: config.db.pool.acquire,
        idle: config.db.pool.idle
      }
    }
  );

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize, DataTypes);
db.category = require("./category.model")(sequelize, Sequelize, DataTypes);
db.product = require("./product.model")(sequelize, Sequelize, DataTypes);
db.product_images = require('./product_image.model')(sequelize, Sequelize, DataTypes);
db.product_reviews = require('./product_review.model')(sequelize, Sequelize, DataTypes);
db.cart = require('./cart.model')(sequelize, Sequelize, DataTypes);
db.order = require('./order.model')(sequelize, Sequelize, DataTypes);
db.order_detail = require('./order_detail.model')(sequelize, Sequelize, DataTypes);
module.exports = db;