const knex = require('knex')(require('../knexfile'));
const { isValidUserData } = require('../utils/validator');

const userOrderDetails = async (req, res) => {
  try {
    const foundUser = await knex('user').where({ id: req.params.user_id });

    if (!foundUser.length) {
      return res.status(404).json({ message: 'user was not found' });
    }
    const userOrder = await knex('order')
      .where({
        borrower_id: foundUser[0].id,
      })
      .select('*');
    if (userOrder.length === 0) {
      res.status(500).json({ message: 'user is empty!' });
    } else {
      res.status(200).json(userOrder);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const index = async (req, res) => {
  try {
    const { sort_by, order_by, s } = req.query;
    let query = knex('user');
    if (sort_by && typeof sort_by === 'string' && sort_by.trim() !== '') {
      query = query.orderBy(sort_by, order_by || 'asc');
    }
    if (s) {
      const searchTerm = `%${s}%`;
      query = query.where(function () {
        this.where('role', 'like', searchTerm)
          .orWhere('name', 'like', searchTerm)
          .orWhere('email', 'like', searchTerm)
          .orWhere('phone', 'like', searchTerm);
      });
    }
    const data = await query;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
};
const singleUser = async (req, res) => {
  try {
    const userFound = await knex('user').where({ id: req.params.user_id }).first();

    if (!userFound) {
      return res.status(404).json({
        message: `user with ID ${req.params.user_id} not found`,
      });
    }
    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for user with ID ${req.params.user_id} error: ${error}`,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const rowsDeleted = await knex('user').where({ id: req.params.user_id }).delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `user with ID ${req.params.user_id} not found` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
    });
  }
};

const postUser = async (req, res) => {
  const errors = isValidUserData(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const result = await knex('user').insert(req.body);
    const newUserId = result[0];

    const createdUser = await knex('user').where({ id: newUserId }).first();

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

module.exports = {
  index,
  singleUser,
  postUser,
  deleteUser,
  userOrderDetails
};
