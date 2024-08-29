const Product = require('../models/Product');

exports.getHomePage = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index', { products });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getProductPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.render('product', { product });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
