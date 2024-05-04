const knex = require('knex')(require('../knexfile'));
const { isValidOrderItemData } = require('../utils/validator');

const index = async (req, res) => {
  try {
    let query = knex('order');
    const data = await query;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving order items: ${err}`);
  }
};
const postOrderItem = async (req, res) => {
  const errors = await isValidOrderItemData(req, res);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const postData = {
    borrower_id: req.body.borrower_id,
    inventory_id: req.body.inventory_id,  
    quantity: req.body.quantity, 
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  
  try {
    const data = await knex('order').insert(postData);
    const newOrderItem = data[0];

    const createdOrderItem = await knex('order').where({ id: newOrderItem }).first();
    res.status(201).json({ createdOrderItem });
  } catch (err) {
    res.status(500).json({ message: `Error creating the Order item` });
  }
}
const singleOrder = async (req, res) => {
  try {
    const orderFound = await knex('order').where({ id: req.params.order_id }).first();

    if (!orderFound) {
      return res.status(404).json({
        message: `order with ID ${req.params.order_id} not found`,
      });
    }
    res.status(200).json(orderFound);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for order with ID ${req.params.order_id} error: ${error}`,
    });
  }
};

const orderItemsInventory = async (req, res) => {
  try {
    const foundOrder = await knex('order').where({ id: req.params.order_id });

    if (!foundOrder.length) {
      return res.status(404).json({ message: 'order was not found' });
    }
    const orderItemInventory = await knex('order')
      .where({
        order_id: foundOrder[0].id,
      })
      .select('*');
    if (orderItemInventory.length === 0) {
      res.status(500).json({ message: 'order is empty!' });
    } else {
      res.status(200).json(orderItemInventory);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// router.get('/availability/:inventoryId/:startDate/:endDate', async (req, res) => {
//   const { inventoryId, startDate, endDate } = req.params;

//   try {
//     // Retrieve reservations from the database that overlap with the specified duration and match the inventory ID
//     const reservations = await OrderItem.find({
//       inventory_id: inventoryId,
//       start_date: { $lte: endDate },
//       end_date: { $gte: startDate }
//     });

//     // Calculate availability status
//     const availabilityMap = calculateAvailability(reservations, startDate, endDate);

//     res.json({ availabilityMap });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports = {
  index,
  postOrderItem,
  singleOrder, 
  orderItemsInventory
};
