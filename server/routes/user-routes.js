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
  .put(userController.updateUser);

router.route('/user/:user_id/inventories').get(userController.inventories);

module.exports = router;
