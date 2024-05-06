const router = require('express').Router();
const reservationController = require('../controllers/reservation-controller');
const { tokenVerify, userOnly } = require("../middleware/auth.middleware");

router.route('/availability/:inventoryId', tokenVerify, userOnly).get(reservationController.durationAvailability);
router
  .route('/order_item', tokenVerify, userOnly)
  .get(reservationController.index)
  .post(reservationController.postOrderItem);

router
    .route('/order/:order_id')
    .get(reservationController.singleOrder)
  
router.route('/order/:order_id/order_item').get(reservationController.orderItemsInventory);


module.exports = router;
