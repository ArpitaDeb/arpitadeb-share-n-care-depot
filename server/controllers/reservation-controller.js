const knex = require('knex')(require('../knexfile'));
const { isValidOrderItemData } = require('../utils/validator');

const index = async (req, res) => {
  try {
    let query = knex('order_item');
    
    const data = await query;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving order items: ${err}`);
  }
};
const postOrderItem = async (req, res) => {
  console.log(req.body, "15");
  const errors = await isValidOrderItemData(req, res);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const postData = {
    inventory_id: req.body.inventory_id,  
    quantity: req.body.quantity, 
    start_date: req.body.start_date,
    end_date: req.body. end_date,
  };
  try {
    const data = await knex('order_item').insert(postData);
    const newOrderItem = data[0];
    const createdOrderItem = await knex('order_item').where({ id: newOrderItem }).first();
    res.status(201).json({ createdOrderItem });
  } catch (err) {
    res.status(500).json({ message: `Error creating the Order item` });
  }
}

module.exports = {
  index,
  postOrderItem
};
