/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const categoryData = require('../seed-data/category');
const orderData = require('../seed-data/order');
const userData = require('../seed-data/user');
const order_itemData = require('../seed-data/order_item');
const inventoriesData = require('../seed-data/inventories');

exports.seed = async function(knex) {
  await knex('order_item').del();
  await knex('order').del();
  await knex('user').del();
  await knex('inventories').del();
  await knex('category').del();
  await knex('category').insert(categoryData);
  await knex('inventories').insert(inventoriesData);
  await knex('user').insert(userData);
  await knex('order').insert(orderData);
  await knex('order_item').insert(order_itemData);
};