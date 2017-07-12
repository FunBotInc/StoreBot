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

    const [customer, count] = await Promise.all([ customersPromise, countPromise ]);
    const pages = Math.ceil(count / limit);
    res.render('adminCustomers', {title: 'Customer List', customer, count, page, pages});
}