module.exports = [
  {
    id: 1,
    inventory_id: 3,
    quantity: 1,
    order_id: 1,
    taken_at: new Date(), 
    return_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    inventory_id: 7,
    quantity: 1,
    order_id: 2,
    taken_at: new Date(), 
    return_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
];