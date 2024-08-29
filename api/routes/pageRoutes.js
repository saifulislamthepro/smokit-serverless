const express = require('express');
const { getHomePage, getProductPage } = require('../../controllers/pageController');

const router = express.Router();

router.get('/', getHomePage);
router.get('/product/:id', getProductPage);

module.exports = router;
