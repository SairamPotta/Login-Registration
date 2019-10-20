const asyncMiddleware = require('../middleware/async');
const { validate } = require('../models/auth');
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', asyncMiddleware (async (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const userInfo = await User.findOne({ emailId: req.body.emailId });
        if (!userInfo) return res.status(400).send('Invalid emailId and password');
        
        const isValid = await bcrypt.compare(req.body.password, userInfo.password);
        if (!isValid) return res.status(400).send('Invalid emailId and password');
    
        const token = userInfo.generateAuthToken();
        const response = {
            token,
            emailId: userInfo.emailId
        }    
        return res.send(response);
}));

module.exports = router;