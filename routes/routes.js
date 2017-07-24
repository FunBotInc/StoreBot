const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const loginController = require('../controllers/loginController');
const { catchErrors } = require('../handlers/errorHandlers');

// get ALL products and paginate
router.get('/', 
    authController.isLoggedIn,
    catchErrors( pageController.getProducts ));
router.get('/products', 
    authController.isLoggedIn,
    catchErrors( pageController.getProducts ));
router.get('/products/page/:page', 
    authController.isLoggedIn,
    catchErrors( pageController.getProducts ));
router.get('/products/:slug', 
    authController.isLoggedIn,
    catchErrors( pageController.getProductBySlug ));


router.get('/admin/products', 
    authController.adminLoggedIn,
    catchErrors( pageController.getProducts ));
router.get('/admin/products/page/:page', 
    authController.adminLoggedIn,
    catchErrors( pageController.getProducts ));
router.get('/admin/products/:slug', 
    authController.adminLoggedIn,
    catchErrors( pageController.getProductBySlug ));

// go to and post a NEW product
router.get('/admin/add',
    authController.adminLoggedIn, 
    pageController.addProduct);
router.post('/admin/add',
    pageController.upload,
    catchErrors( pageController.resize ),
    catchErrors( pageController.createProduct ));

//go to single products edit page and UPDATE
router.get('/admin/products/:id/edit',
    authController.adminLoggedIn,    
    catchErrors( pageController.editProduct ));
router.post('/admin/add/:id', 
    pageController.upload,
    catchErrors( pageController.resize ),
    catchErrors( pageController.updateProduct ));

router.get('/admin/accounts', 
    authController.adminLoggedIn,
    catchErrors( accountController.getAccounts ));
router.get('/admin/accounts/add',
    authController.adminLoggedIn,
    accountController.addAccount);
router.get('/admin/accounts/:id/edit', 
    authController.adminLoggedIn,
    catchErrors( accountController.getAccount ));


router.post('/admin/accounts/add',
    catchErrors( accountController.createAccount ));
router.post('/admin/accounts/add/:id',
    catchErrors( accountController.updateAccount ));

router.get('/login', loginController.loginForm);
router.get('/register', loginController.registerForm);

router.post('/login', authController.login);
router.post('/register',
    loginController.validateForm,
    loginController.registerAccount,
    authController.login
);

module.exports = router;
