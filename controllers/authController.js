const passport = require('passport');

exports.login = passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'Welcome, You are now loggedIn!',
    failureRedirect: '/login',
    failureFlash: 'Login Failed'
});

exports.loguot = (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out');
    res.redirect('/');
};

exports.isLoggedIn = (req, res) => {
    if(!req.isAuthenticated()){
        next()
        return;
    }
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
};
