const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const slug = require('slugs');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
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
        type: String,
        required: 'Please input a street number, PO Boxes cannot be used',
        trim: true
    },
    streetname: {
        type: String,
        required: 'Please input a street name',
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
        type: String,
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
    },
    role: {
        type: String,
        possibleValues: ['admin', 'vendor'],
        required: 'Please provide a role of either "admin" or "vendor"'
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{Value} is not a valid phone number'
        },
        required: [true, 'Please provide a phone number']
    }
});

accountSchema.plugin(mongodbErrorHandler);
accountSchema.plugin(passportLocalMongoose,{ usernameField: 'email' });

module.exports = mongoose.model('Account', accountSchema);
