const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.getOrder);
router.get('/all', orderController.getAllOrder);
router.post('/',orderController.createOrderMain);
// router.post('/detail',orderController.createOrderDetails);
router.delete('/',orderController.deleteOrder);
router.delete('/detail',orderController.deleteOrderDetails);

module.exports = router;