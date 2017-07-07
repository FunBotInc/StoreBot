const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.index = (req, res) => {
    res.render('index', {title: 'Index Page'});
};

exports.addProduct = (req, res) => {
    res.render('editProduct', {title: 'Add/Edit Product'});
}
