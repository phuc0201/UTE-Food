module.exports = {
    db: {
      DB_HOST: 'localhost',
      DB_USER: 'root',
      DB_PASS: 'phuc02012002',
      DB_NAME: 'utefood',
      dialect: "mysql",

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
};