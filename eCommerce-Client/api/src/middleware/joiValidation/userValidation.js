const Joi = require('joi');

const clientRegistrationValidation = (req, res, next)=> {
    try {
        const schema = Joi.object({
            fName: Joi.string().min().max().required(),
            lName: Joi.string().min(3).max(20).required(),
            phone: Joi.number().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
                .min(6)
                .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
                .message('Password must be at least 6 characters long, contain one number, one capital letter, and one special character'),
        });
       const {error} = schema.validate(req.body);
       if(error){
        res.json({
           status: Error,
           message: error.message
        })
       }
       else{
        console.log(`validation passed`)
       }

    } catch (e) {
       next(e) 
    }
}