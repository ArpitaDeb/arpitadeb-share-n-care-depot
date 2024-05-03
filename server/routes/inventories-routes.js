const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controller');
const { tokenVerify, adminOnly, userOnly } = require("../middleware/auth.middleware");

router
  .route('/inventories/:inventoryId', tokenVerify, userOnly)
  .get(inventoriesController.getOneInventory)
router
  .route('/inventories/:inventoryId', tokenVerify, adminOnly)
  .delete(inventoriesController.deleteInventory);

router
  .route('/inventories')
  .get(inventoriesController.inventoryList)
router
  .route('/inventories', tokenVerify, adminOnly)
  .post(inventoriesController.postInventoryItem);

router.route('/inventories/:inventoryId/order_item', tokenVerify, userOnly).get(inventoriesController.inventoryOrderItems);

module.exports = router;
