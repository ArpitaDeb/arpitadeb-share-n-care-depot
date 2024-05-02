const router = require('express').Router();
const orderController = require('../controllers/order-controller');

router
  .route('/order/:order_id')
  .get(orderController.singleOrder)

router.route('/order/:order_id/order_item').get(orderController.orderItemsInventory);

module.exports = router;
