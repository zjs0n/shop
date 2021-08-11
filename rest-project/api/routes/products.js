const express = require('express');
const router = express.Router();
const authcheck = require('../middleware/auth-check');
const productsController = require("../controllers/products");

router.get('/', productsController.products_get_all);
router.post('/', authcheck, productsController.products_create);
//add more descriptive api stuff
router.get('/:productId', authcheck, productsController.products_get);
router.patch('/:productId', authcheck, productsController.products_patch);
router.delete('/:productId', authcheck, productsController.products_delete);
module.exports = router;