const express = require('express');
const ProductApi = require('../controllers/products');

const router = express.Router();

router.get('/', ProductApi.getAll);
router.post('/', ProductApi.create);


router.get('/search/:name', ProductApi.search);
// router.post('/upload', upload.array('files', 3), ProductApi.uploadImg);
router.put('/:productId', ProductApi.update);
router.delete('/:productId', ProductApi.delete);

module.exports = router;
