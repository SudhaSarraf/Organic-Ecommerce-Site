const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controllers');
const { updateProduct } = require('../models/products.model');

router.get('/all', productController.getTotalProduct);
router.get('/', productController.getProductDetail);
router.post('/',productController.createNewProduct);
router.put('/',productController.updateProduct);
router.delete('/',productController.deleteProduct);

module.exports = router;