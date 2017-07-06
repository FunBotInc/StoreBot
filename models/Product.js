const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a product name'
    }
});

module.exports = mongoose.model('Product', productSchema);