const Product = require('../models/Product');

exports.addToCart = (req, res) => {
    const { productId, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    let cart = req.session.cart;

    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
    } else {
        cart.push({ productId, quantity: parseInt(quantity) });
    }

    req.session.cart = cart;
    res.redirect('/cart');
};

exports.removeFromCart = (req, res) => {
    const { productId } = req.body;
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);
    res.redirect('/cart');
};

exports.updateQuantity = (req, res) => {
    const { productId, quantityChange } = req.body;
    const cart = req.session.cart;

    const product = cart.find(item => item.productId === productId);

    if (product) {
        product.quantity += parseInt(quantityChange);
        if (product.quantity <= 0) {
            req.session.cart = cart.filter(item => item.productId !== productId);
        } else {
            req.session.cart = cart;
        }
    }

    res.redirect('/cart');
};

exports.getCart = async (req, res) => {
    let cart = req.session.cart || [];
    
    // Populate product details
    cart = await Promise.all(cart.map(async item => {
        const product = await Product.findById(item.productId);
        return {
            ...item,
            product
        };
    }));

    res.render('cart', { cart });
};




