const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function validateUser(body)  {
    const schema = {
        emailId: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required(),
        name: Joi.string().required().min(3),
        mobileNumber: Joi.number().required(),
    }

    return Joi.validate(body, schema);
}

const userSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    mobileNumber: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const securityToken = 'CrashedCourse';
    const payLoad = {
        _id: this._id,
        name: this.name,
        emailId: this.emailId,
        isAdmin: this.isAdmin
    }
    return jwt.sign(payLoad, securityToken, { expiresIn: '0.5h' });
}

const Users = mongoose.model('Users', userSchema);

module.exports.validate = validateUser;
module.exports.User = Users;
