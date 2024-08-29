const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    const cart = req.session.cart;
    // Cart stored in session with productId and quantity
    if (!cart || cart.length === 0) {
        return res.redirect('/cart'); // Redirect if the cart is empty
    }

    try {
        // Fetch product details from the database using the product IDs stored in the session
        const productsWithDetails = await Promise.all(
            cart.map(async (item) => {
                const product = await Product.findById(item.productId);
                return {
                    product: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                    },
                    quantity: item.quantity
                };
            })
        );

        // Calculate the total amount for the order
        const totalAmount = productsWithDetails.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);

        // Create a new order document
        const order = new Order({
            user: req.session.user._id, // Get the user ID from the session
            products: productsWithDetails.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount,
            status: 'Pending' // Default status when order is created
        });

        await order.save(); // Save the order to the database

        // Clear the cart after order is placed
        req.session.cart = [];

        res.redirect('/orders'); // Redirect to the orders page
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
};


exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.session.user._id })
            .populate('products.product')
            .sort({ createdAt: -1 });

        res.render('orders', { orders });
    } catch (error) {
        res.status(500).send('Error fetching orders');
    }
};
