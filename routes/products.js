const { Router } = require('express');
const { getProducts } = require('../controllers/products')

const router = Router();

router.route('/')
    .get(getProducts);


module.exports = router;