const express = require('express');

const router = express.Router();

const {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    searchOrders,
    getOrdersByUser
} = require('../controllers/order');

router.get('/search', searchOrders);
router.get('/filter', getOrdersByUser);
router.get('/', getAllOrders);
router.get('/:orderId', getOrder);
router.post('/', createOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;
