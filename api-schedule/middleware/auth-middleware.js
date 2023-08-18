module.exports = function requireAuth(req, res, next) {
    if (req.user) {
        return next();
    }

    res.redirect('/login');
}