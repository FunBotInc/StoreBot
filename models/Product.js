const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a product name'
    },
    description: { 
        type: String, 
        trim: true,
        required: 'Please enter a description'
    },
    price: { 
        type: Number,
        required: 'Please enter a Price'
    },
    thc: { 
        type: Number,
        required: 'Please enter a percentage in for the THC content'
    },
    cbd: {
        type: Number,
        required: 'Please enter a percentage in for the CBD content'
    },
    slug: String,
    photo: String,
    // tags: [ String ],
    created: {
        type: Date,
        default: Date.now
    }
},{
        toJSON: { virtuals: true},
        toObject: { virtuals: true }
    }
);

productSchema.pre('save', async function(next){
    if(!this.isModified('name')){
        next();
        return;
    }
    this.slug = slug(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*)?)$`, 'i');
    const productsWithSlug = await this.constructor.find({slug: slugRegEx});
    if(productsWithSlug.length){
        this.slug = `${this.slug}-${productsWithSlug.length+1}`
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);