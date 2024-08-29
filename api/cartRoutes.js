const express = require('express');
const { addToCart, removeFromCart, updateQuantity, getCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/cart/add', addToCart);
router.post('/cart/remove', removeFromCart);
router.post('/cart/update', updateQuantity);
router.get('/cart', getCart);

module.exports = router;
