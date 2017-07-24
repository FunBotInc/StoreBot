const mongoose = require('mongoose');
const Account = mongoose.model('Account');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
    res.render('login', {title: 'Login'});
};

exports.registerForm = (req, res) => {
    res.render('register', {title: 'Register'});
};

exports.validateForm = (req, res, next) => {
    req.sanitizeBody('firstname');
    req.checkBody('firstname', 'You must supply a first name').notEmpty();

    req.sanitizeBody('lastname');
    req.checkBody('lastname', 'You must supply a last name').notEmpty();

    req.sanitizeBody('streetnumber').trim();
    req.checkBody('streetnumber', 'You must supply a street number');

    req.sanitizeBody('streetname').trim();
    req.checkBody('streetname', 'You must supply a street name and type');

    req.sanitizeBody('city').trim();
    req.checkBody('city', 'You must supply a city');

    req.sanitizeBody('zipcode').trim();
    req.checkBody('zipcode', 'You must supply a zipcode');

    req.sanitizeBody('phone');
    req.checkBody('phone', 'You must supply a phone number');

    req.sanitizeBody('license').trim();
    req.checkBody('licence', 'You must supply an Oregon License number');

    req.checkBody('email', 'You must supply a valid email').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extensions: false,
        gmail_remove_subaddress: false
    });

    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.checkBody('confirm-password', 'Confirmed password cannot be blank').notEmpty();
    req.checkBody('confirm-password', 'Confirmed password does not match password').equals(req.body.password);

    const errors = req.validationErrors();
    if(errors){
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
        return;
    }
    next();
};

exports.registerAccount = async (req, res, next) => {
    const options = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        streetnumber: req.body.streetnumber,
        streetname: req.body.streetname,
        city: req.body.city,
        zipcode: req.body.zipcode,
        license: req.body.license,
        email: req.body.email,
        role: req.body.role,
        phone: req.body.phone
    }
    console.log(options);
    const account = new Account(options);
    const register = promisify(Account.register, Account);
    await register(account, req.body.password);
    next();
}
