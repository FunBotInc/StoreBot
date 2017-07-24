const passport = require('passport');

exports.login = passport.authenticate('local', {
    successRedirect: '/products',
    successFlash: 'Welcome, You are now loggedIn!',
    failureRedirect: '/login',
    failureFlash: 'Login Failed'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
        return;
    }
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
};

exports.adminLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role === 'admin'){
        next()
        return;
    }
    req.flash('error', 'You must be an Admin to do that');
    res.redirect('/login');
};
