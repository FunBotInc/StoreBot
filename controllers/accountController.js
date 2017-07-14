const mongoose = require('mongoose');
const Account = mongoose.model('Account');

exports.getAccounts = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 10;
    const skip = (limit * page) - limit;
    const accountsPromise = Customer
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ lastname: 1 });
    const countPromise = Account.count();

    const [accounts, count] = await Promise.all([ accountsPromise, countPromise ]);
    const pages = Math.ceil(count / limit);
    res.render('adminAccounts', {title: 'Account List', accounts, count, page, pages});
};

exports.addCustomer = (req, res) => {
    res.render('adminEditAccount', {title: 'Add Account'});
}

exports.createCustomer = async (req, res) => {
    const customer = await (new Account(req.body)).save();
    req.flash('info', 'Success!! a new customer was added!');
    res.redirect('/admin/accounts');
};

exports.getAccount = async (req, res) => {
    const account = Account.findOne({_id: req.})
}