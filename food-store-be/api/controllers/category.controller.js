const db = require('../models/index');

module.exports = {
    findAll : (req, res) => {
        db.category.findAll()
        .then(data =>{
            if (!data) {
                return res.status(400).send({
                    message: "Category not found!"
                });
            }
            return res.status(200).send(data);
        })
        .catch(err =>{
            return res.status(500).send({
                message: err || 'Failed'
            })
        })
        
    },
    create : (req, res) => {
        if (!req.body.category_name) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        const category = {
            category_name: req.body.category_name,
            description: req.body.description,
            image: req.image
        };

        db.category.findOne({where: {category_name: category.category_name}})
        .then(data => {
            if (data) {
                res.status(400).send({
                    message: "Category already exists!"
                });
            } else {
                db.category.create(category)
                .then(data => {
                    res.status(200).send({
                        message: "Category was created successfully."
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Category."
                    });
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Category."
            });
        });
    },
}