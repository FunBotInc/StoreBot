const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const customerController = require('../controllers/customerController');
const { catchErrors } = require('../handlers/errorHandlers');

// get ALL products and paginate
router.get('/', catchErrors( pageController.getProducts ));
router.get('/products', catchErrors( pageController.getProducts ));
router.get('/products/page/:page', catchErrors( pageController.getProducts ));
router.get('/products/:slug', catchErrors( pageController.getProductBySlug ));


router.get('/admin/products', catchErrors( pageController.getProducts ));
router.get('/admin/products/page/:page', catchErrors( pageController.getProducts ));
router.get('/admin/products/:slug', catchErrors( pageController.getProductBySlug ));

// go to and post a NEW product
router.get('/admin/add', pageController.addProduct);
router.post('/admin/add',
    pageController.upload,
    catchErrors( pageController.resize ),
    catchErrors( pageController.createProduct )
);

//go to single products edit page and UPDATE
router.get('/admin/products/:id/edit', catchErrors( pageController.editProduct ));
router.post('/admin/add/:id', 
    pageController.upload,
    catchErrors( pageController.resize ),
    catchErrors( pageController.updateProduct )
);

module.exports = router;
