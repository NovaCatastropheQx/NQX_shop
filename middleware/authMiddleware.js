const requireLogin = (req, res, next) => {

    // User has not logged in
    if (!req.session.user) {
        return res.redirect("/login");
    }

    // User has logged in
    next();
};

module.exports = requireLogin;