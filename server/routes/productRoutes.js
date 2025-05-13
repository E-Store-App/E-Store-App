const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  likeProduct,
  buyProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.post('/:id/like', likeProduct);
router.post('/:id/buy', buyProduct);

module.exports = router;