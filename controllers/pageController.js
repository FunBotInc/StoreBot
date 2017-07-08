const mongoose = require('mongoose');
const multer = require('multer');
const uuid = require('uuid');
const jimp = require('jimp');

const Product = mongoose.model('Product');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next){
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
            next(null, true);
        } else {
            next({message: 'The filetype of your upload is not allowed'}, false);
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    if(!req.file){
        next();
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    const width = 800;
    req.body.photo = `${uuid.v4()}.${extension}`;

    const photo = await jimp.read(req.file.buffer);
    await photo.resize(width, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    next();
};


exports.getProducts = async (req, res) => {

    const page = req.params.page || 1;
    const limit = 10;
    const skip = (limit * page) - limit;

    const productsPromise = Product
        .find()
        .skip(skip)
        .limit(limit)
        .sort({created: 'desc'});
    const countPromise = Product.count();

    const [products, count ] = await Promise.all( [productsPromise, countPromise] );
    const pages = Math.ceil(count / limit);

    if(!products.length && skip){
        req.flash('info', `Hey! ${page} does not exist. Redirecting you to page ${pages}`);
        res.redirect(`/products/page/${pages}`);
        return;
    }
    res.render('products', {title: 'Products', products, count, page, pages});
};





exports.addProduct = (req, res) => {
    res.render('editProduct', {title: 'Add/Edit Product'});
};

exports.createProduct = async (req, res) => {
    console.log(req.body);
    const product = await (new Product(req.body)).save();
    req.flash('success', 'New product has been added!');
    // res.redirect(`/products/${product.slug}`);
    // res.redirect('/products');
    res.json(product);
};

exports.updateProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    }).exec();
    res.redirect(`/products/${product._id}`);
};

exports.editProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    res.render('editProduct', {title: `Edit: ${product.name}`, product});
}