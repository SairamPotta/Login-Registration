
module.exports = function(req, res, next) {
    if (req.user.isAdmin) next();
    return res.status(403).send('Unauthorized Access');
}