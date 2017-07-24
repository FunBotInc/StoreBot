const mongoose = require('mongoose');
const Account = mongoose.model('Account');

exports.getAccounts = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 10;
    const skip = (limit * page) - limit;
    const accountsPromise = Account
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ lastname: 1 });
    const countPromise = Account.count();

    const [accounts, count] = await Promise.all([ accountsPromise, countPromise ]);
    const pages = Math.ceil(count / limit);
    res.render('adminAccounts', {title: 'Account List', accounts, count, page, pages});
};

exports.getAccount = async (req, res) => {
    const account = await Account.findOne({_id: req.params.id});
    console.log(account);
    res.render('adminEditAccount', {title: `Edit: ${account.firstname} ${account.lastname}`, account});
}

exports.addAccount = (req, res) => {
    res.render('adminEditAccount', {title: 'Add Account'});
}

exports.createAccount = async (req, res) => {
    const account = await (new Account(req.body)).save();
    req.flash('info', 'Success!! a new account was added!');
    res.redirect('/admin/accounts');
};



exports.updateAccount = async (req, res) => {
    const account = Account.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    }).exec();
    res.redirect('/admin/accounts');
}

