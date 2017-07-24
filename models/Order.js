const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'account',
        required: 'must have a buyer for this order!'
    },
    created: {
        type: Date,
        default: Date.now
    }
});