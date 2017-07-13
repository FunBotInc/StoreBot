const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.getCustomers = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 10;
    const skip = (limit * page) - limit;
    const customersPromise = Customer
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ lastname: 1 });
    const countPromise = Customer.count();

    const [customers, count] = await Promise.all([ customersPromise, countPromise ]);
    const pages = Math.ceil(count / limit);
    res.render('adminCustomers', {title: 'Customer List', customers, count, page, pages});
};

exports.addCustomer = (req, res) => {
    res.render('adminEditCustomer', {title: 'Add Customer'});
}

exports.createCustomer = async (req, res) => {
    const customer = await (new Customer(req.body)).save();
    req.flash('info', 'Success!! a new customer was added!');
    res.redirect('/admin/customers');
};

