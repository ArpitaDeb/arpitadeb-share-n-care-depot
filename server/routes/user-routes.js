const router = require('express').Router();
const userController = require('../controllers/user-controller');

router
  .route('/user')
  .get(userController.index)
  .post(userController.postUser);

router
  .route('/user/:user_id')
  .get(userController.singleUser)
  .delete(userController.deleteUser)

router.route('/user/:user_id/order').get(userController.userOrderDetails);

module.exports = router;
