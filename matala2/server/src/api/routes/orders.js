const express = require('express');

const router = express.Router();

const {
    getAllOrders,
    createOrder,
} = require('../controllers/order');

router.get('/',  getAllOrders);
router.post('/', createOrder);

module.exports = router;
