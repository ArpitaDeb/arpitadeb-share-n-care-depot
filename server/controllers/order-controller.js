const knex = require('knex')(require('../knexfile'));

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
    const orderItemInventory = await knex('order_item')
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


module.exports = {
  singleOrder, 
  orderItemsInventory
};
