const asyncMiddleware = require('../middleware/async');
const { User, validate } = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userInfo = await User.findOne({ emailId: req.body.emailId });
    if (userInfo) return res.status(400).send('Sorry emailId already exists.');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        emailId: req.body.emailId,
        password: hashed,
        name: req.body.name,
        mobileNumber: req.body.mobileNumber
    });
    await user.save();
    
    const token = user.generateAuthToken();
    const response = {
        token,
        name: user.name,
        createdDate: user.createdDate
    }

    return res.send(response);
}));

module.exports = router;