const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const slug = require('slugs');
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'Please fill out your first name',
        trim: true
    },
    lastname: {
        type: String,
        required: 'Please fill out your last name',
        trim: true
    },
    streetnumber: {
        type: Number,
        required: 'Please input a street number, PO Boxes cannot be used',
        trim: true
    },
    streetname: {
        type: String,
        required: 'Please input a street name, include cardinal direction',
        trim: true
    },
    streettype: {
        type: String,
        required: 'Please input a street type. ex: Ave., St., Rd.....',
        trim: true
    },
    city: {
        type: String,
        required: 'Please provide the city',
        trim: true
    },
    state: {
        type: String,
        default: 'OR',
        trim: true
    },
    zipcode: {
        type: Number,
        required: 'Please provide your 5 digit zipcode',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email address'],
        required: 'Please provide an email address'
    },
    license: {
        type: String,
        required: 'Please provide your Oregon state license related to medicinal / recreational / wholesale / manufacturing of marijuana and/or marijuana related products',
        trim: true
    }
});

customerSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Customer', customerSchema);
