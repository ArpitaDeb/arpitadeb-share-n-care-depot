const knex = require('knex')(require('../knexfile'));
const { isValidInventoryData } = require('../utils/validator');
const storage = require('../service/storage');

const getFileFromBucket = async (bucketName, fileName) => {
  try {
    const bucket = storage.bucket(bucketName);
    console.log("buck", bucket);
    const file = bucket.file(fileName);
    const contents = await file.download();
    return contents.toString();
  } catch (error) {
    console.error('Error downloading file from bucket:', error);
    throw new Error('Failed to download file from bucket');
  }
};

const inventoryList = async (req, res) => {
  try {
    const { sort_by, order_by, s } = req.query;
    const bucketName = 'sharencaredepot';
    const fileName = 'sharecare_inventories.sql';
    const fileContents = await getFileFromBucket(bucketName, fileName);
;
    console.log('File contents:', fileContents);

    let inventories;
    try {
      inventories = JSON.parse(fileContents);
    } catch (parseError) {
      console.error('Failed to parse file contents as JSON:', parseError);
      throw new Error('Invalid file format: expected JSON');
    }

    let filteredData = inventories;
    if (s) {
      const searchTerm = s.toLowerCase();
      filteredData = filteredData.filter(inventory =>
        inventory.item_name.toLowerCase().includes(searchTerm)
      );
    }

    if (sort_by && typeof sort_by === 'string' && sort_by.trim() !== '') {
      filteredData.sort((a, b) => {
        const order = order_by === 'desc' ? -1 : 1;
        if (a[sort_by] < b[sort_by]) return -1 * order;
        if (a[sort_by] > b[sort_by]) return 1 * order;
        return 0;
      });
    }

    // Send the filtered and sorted inventory data as the response
    res.status(200).json(filteredData);
  } catch (err) {
    console.error('Error getting the inventory list:', err);
    res.status(500).json({ message: 'Error getting the inventory list' });
  }
};

// const inventoryList = async (req, res) => {
//   try {
//     const { sort_by, order_by, s } = req.query;
//     let query = knex
//       .select(
//         'inventories.id',
//         'inventories.item_name',
//         'inventories.description',
//         'inventories.quantity',
//         'inventories.image_url',
//         'category.name as category',
//       )
//       .from('inventories')
//       .join('category', 'inventories.category_id', 'category.id');

//     if (sort_by && typeof sort_by === 'string' && sort_by.trim() !== '') {
//       query = query.orderBy(sort_by, order_by || 'asc');
//     }

//     if (s) {
//       const searchTerm = `%${s}%`;
//       query = query.where(function () {
//         this.where('inventories.item_name', 'like', searchTerm)
//       });
//     }

//     const data = await query;
//     const bucketName = 'sharencaredepot';
//     const fileName = 'sharecare_inventories.sql';
//     const fileContents = await getFileFromBucket(bucketName, fileName);
//     console.log('File contents:', fileContents);

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: `Error getting the list` });
//   }
// };
const getOneInventory = async (req, res) => {
  try {
    const oneInventory = await knex('inventories').where({ id: req.params.inventoryId }).first();

    if (!oneInventory) {
      return res.status(404).json({
        message: `inventory with ID ${req.params.inventoryId} not found`,
      });
    }
    res.status(200).json(oneInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for inventory with ID ${req.params.inventoryId} error: ${error}`,
    });
  }
};
const postInventoryItem = async (req, res) => {
  const errors = await isValidInventoryData(req, res);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const postData = {
    category_id: req.body.category_id,
    item_name: req.body.item_name,
    description: req.body.description,
    quantity: 1,
    image_url: req.body.image_url,
  };
  try {
    const data = await knex('inventories').insert(postData);
    const newInventoryItem = data[0];
    const createdInventoryItem = await knex('inventories').where({ id: newInventoryItem }).first();
    res.status(201).json({ createdInventoryItem });
  } catch (err) {
    res.status(500).json({ message: `Error creating the inventory item` });
  }
}

const updateInventoryItem = async (req, res) => {
  const errors = await isValidInventoryData(req, res);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const { inventoryId } = req.params;
  const putData = req.body;
  try {
    const updatedData = await knex('inventories').where({ id: inventoryId }).update(putData);

    res.status(200).json({ updatedData });
  } catch (err) {
    res.status(500).json({ message: `Error updating inventory item` });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const rowsDeleted = await knex('inventories').where({ id: req.params.inventoryId }).delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Inventories with ID ${req.params.inventoryId} not found` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Inventory: ${error}`,
    });
  }
};

const inventoryOrderItems = async (req, res) => {
  try {
    const foundInventory = await knex('inventories').where({ id: req.params.inventory_id });

    if (!foundInventory.length) {
      return res.status(404).json({ message: 'Inventory was not found' });
    }
    const inventoryOrderItem = await knex('order_item')
      .where({
        inventory_id: foundInventory[0].id,
      })
      .select('*');
    if (inventoryOrderItem.length === 0) {
      res.status(500).json({ message: 'Inventory is empty!' });
    } else {
      res.status(200).json(inventoryOrderItem);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  inventoryList,
  postInventoryItem,
  updateInventoryItem,
  getOneInventory,
  deleteInventory,
  inventoryOrderItems
};
