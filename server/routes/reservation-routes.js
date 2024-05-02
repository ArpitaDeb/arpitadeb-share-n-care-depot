const router = require('express').Router();
const reservationController = require('../controllers/reservation-controller');

router
  .route('/order_item')
  .get(reservationController.index)
  .post(reservationController.postOrderItem);

module.exports = router;
