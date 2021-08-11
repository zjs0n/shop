const express = require('express');
const router = express.Router();
const authcheck = require('../middleware/auth-check');
const ordersController = require("../controllers/orders");


router.get('/', authcheck, ordersController.orders_get_all);
router.post("/", authcheck,ordersController.orders_create);
router.get('/:orderId', authcheck, ordersController.orders_get);
router.delete('/:orderId', authcheck, ordersController.orders_delete);



module.exports = router;