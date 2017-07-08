const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors( pageController.getProducts) );
router.get('/products/', catchErrors( pageController.getProducts ));
router.get('/products/:id/edit', catchErrors( pageController.editProducts ));
router.get('/products/page/:page', catchErrors( pageController.getProducts ));

router.get('/add', pageController.addProduct);

router.post('/add',
    pageController.upload,
    catchErrors( pageController.resize ),
    catchErrors( pageController.createProduct )
);

router.post('/add/:id', 
    pageController.upload,
    catchErrors( pageController.resize ),
    catchErrors( pageController.updateProduct)
);

module.exports = router;