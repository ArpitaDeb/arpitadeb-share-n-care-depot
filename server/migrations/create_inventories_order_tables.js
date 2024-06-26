/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('category', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('inventories', (table) => {
      table.increments('id').primary();
      table
        .integer('category_id')
        .unsigned()
        .references('category.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('item_name').notNullable();
      table.string('description').notNullable();
      table.integer('quantity').notNullable();
      table.string('image_url');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('phone').notNullable();
      table.enum('role', ['user', 'admin']).defaultTo('user');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('order', (table) => {
      table.increments('id').primary();
      table
        .integer('borrower_id')
        .unsigned()
        .references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('inventory_id')
        .unsigned()
        .references('inventories.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.timestamp('start_date').notNullable();
      table.timestamp('end_date').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('order')
    .dropTable('user').dropTable('inventories').dropTable('category');
};
