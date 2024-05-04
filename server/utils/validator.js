const knex = require('knex')(require('../knexfile'));

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

 const isValidPhone = (phone) => {
  const usCanadaRegex = /^(\+?1\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const internationalRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const indiaRegex = /^[6-9]\d{9}$/;

  if (usCanadaRegex.test(phone) || internationalRegex.test(phone) || indiaRegex.test(phone)) {
    return true;
  } else {
    return false;
  }
}

const isValidInventoryData = async (req, res) => {
  const { 
    image_url,
    item_name, 
    description, 
    category_id,  
    quantity, 
  } = req.body
  const errors = []
  if ( !item_name || !description || !category_id || !image_url || !quantity) {
    errors.push('Missing properties in the request body')
  }

  if(isNaN(quantity)) {
    errors.push('Quantity must be a number')
  }
  return errors
}

const isValidOrderItemData = async (req, res) => {
  const { 
    borrower_id,    
    inventory_id,  
    quantity, 
    start_date,
    end_date
  } = req.body
  
  const errors = []
  if ( !borrower_id || !inventory_id || !quantity || !start_date || !end_date ) {
    errors.push('Missing properties in the request body')
  }
  if(isNaN(quantity)) {
    errors.push('Quantity must be a number')
  }
  if(isNaN( borrower_id)) {
    errors.push('user Id must be a number')
  }
  if(isNaN(inventory_id)) {
    errors.push('inventory Id must be a number')
  }
  return errors
}
const isValidUserData = (data) => {
  const {
    name,
    phone,
    email,
  } = data;
  const errors = [];

  if (!name) {
    errors.push('Missing required field: name');
  }
  if (phone) {
    errors.push('Missing required field: phone');
  } else if (!isValidPhone(phone)) {
    errors.push('Invalid phone number format for phone');
  }
  if (email) {
    errors.push('Missing required field: email');
  } else if (!isValidEmail(email)) {
    errors.push('Invalid email format for email');
  }
  
  return errors;
};


module.exports = {
  isValidEmail,
  isValidPhone,
  isValidInventoryData,
  isValidUserData,
  isValidOrderItemData
};