const Joi = require('@hapi/joi');

function validateAuth(body)  {
    const schema = {
        emailId: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
    }

    return Joi.validate(body, schema);
}

module.exports.validate = validateAuth;
