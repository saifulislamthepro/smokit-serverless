const path = require('path');
const Product = require('../models/Product');
const fs = require('fs');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: req.file.filename
    });
    await product.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);

      if (!product) {
          return res.status(404).json({ msg: 'Product not found' });
      }

      // If a new image is uploaded, delete the old image
      if (req.file && product.image) {
          const oldImagePath = path.join(__dirname, '../uploads', product.image);

          fs.unlink(oldImagePath, (err) => {
              if (err) {
                  console.error('Failed to delete old image file:', err);
              }
          });

          // Update the product with the new image
          product.image = req.file.filename;
      }

      // Update other product details
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;

      await product.save();

      res.redirect('/dashboard');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);

      if (!product) {
          return res.status(404).json({ msg: 'Product not found' });
      }

      

      // Delete the image file
      fs.unlink(path.join(__dirname, '../uploads', product.image),(err) => {
          if (err) {
              console.error('Failed to delete image file:', err);
          }
      });

      // Delete the product from the database
      await Product.findByIdAndDelete(req.params.id);
      res.redirect('/dashboard')
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
};
