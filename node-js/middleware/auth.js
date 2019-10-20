const jwt = require('jsonwebtoken');

const tokenMessage = 'Access denied.';
module.exports = function (req, res, next) {
    const tokenData = req.header('o-auth-key');
    if(!tokenData) res.status(401).send(tokenMessage + ' No token provided.');

    const securityToken = 'CrashedCourse';
    try {
        jwt.verify(tokenData, securityToken);
        req.user = jwt.decode(tokenData);
        next();
    } catch (error) {
        return res.status(401).send(tokenMessage + ' Invalid token');
    }
}
