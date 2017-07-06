const mongoose = require('mongoose');

exports.index = (req, res) => {
    res.render('index', {title: 'Index Page'});
};