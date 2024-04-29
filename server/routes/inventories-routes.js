const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controller');

router
  .route('/inventories/:inventoryId')
  .get(inventoriesController.getOneInventory)
  .delete(inventoriesController.deleteInventory);

router
  .route('/inventories')
  .get(inventoriesController.inventoryList)
  .post(inventoriesController.postInventoryItem);

router.route('/inventories/:inventoryId').put(inventoriesController.updateInventoryItem);

module.exports = router;
