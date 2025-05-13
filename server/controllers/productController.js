const Product = require('../models/Product');

// GET all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST new product
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

// POST like a product
exports.likeProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  product.likes += 1;
  await product.save();
  res.json(product);
};

// POST buy a product
exports.buyProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  product.buyers += 1;
  await product.save();
  res.json(product);
};