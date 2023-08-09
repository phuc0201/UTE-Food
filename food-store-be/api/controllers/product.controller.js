const db = require('../models/index')
module.exports = {
    findAll : (req, res) => {
        db.product.findAll()
        .then(data =>{
            if (!data) {
                return res.status(400).send({
                    message: "Product not found!"
                });
            }
            return res.status(200).send(data);
        })
        .catch(err =>{
            return res.status(500).send({
                message: err || 'Failed'
            })
        })
        
    }
}