const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controller');
const { tokenVerify, adminOnly, userOnly } = require("../middleware/auth.middleware");

router.route('/inventories/:inventoryId')
  .get(tokenVerify, userOnly, inventoriesController.getOneInventory)
  .delete(tokenVerify, adminOnly, inventoriesController.deleteInventory);

router
  .route('/inventories')
  .get(inventoriesController.inventoryList);
  
router
  .route('/inventories', tokenVerify, adminOnly)
  .post(inventoriesController.postInventoryItem);

router.route('/inventories/:inventoryId/order_item', tokenVerify).get(inventoriesController.inventoryOrderItems);

module.exports = router;
