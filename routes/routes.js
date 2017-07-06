const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', pageController.index);

module.exports = router;