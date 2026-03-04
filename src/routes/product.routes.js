const express = require('express');
const { categorizeAndStoreProduct } = require('../controllers/product.controller');

const router = express.Router();

router.post('/', categorizeAndStoreProduct);

module.exports = router;