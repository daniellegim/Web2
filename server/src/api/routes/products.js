const express = require('express');
const ProductApi = require('../controllers/products');

const router = express.Router();

router.get('/', ProductApi.getAll);
router.post('/', ProductApi.create);

module.exports = router;
