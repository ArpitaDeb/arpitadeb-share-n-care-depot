const router = require('express').Router();
const reservationController = require('../controllers/reservation-controller');
const { tokenVerify, adminOnly, userOnly } = require("../middleware/auth.middleware");

router
  .route('/order_item', tokenVerify, userOnly)
  .get(reservationController.index)
  .post(reservationController.postOrderItem);

module.exports = router;
