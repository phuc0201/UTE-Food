const Joi = require('joi');
module.exports = {
    registerValidator: (req, res, next) =>{
        const schema = Joi.object({
            full_name: Joi.string().min(5).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
            phone_number: Joi.string().min(10).max(10).pattern(/^\S+$/).required(),
            address : Joi.string(),
            avatar : Joi.string().min(0),
            date_of_birth : Joi.string().required()
        }); 
        try {
            const value = schema.validate(req.body);
            if (value.error) {
                res.status(400).send({ message: value.error.details[0].message });
                return;
            }
        } catch (err) {
            res.status(500).send({ message: 'register failed' });
            return;
        }
        next();
    }
}