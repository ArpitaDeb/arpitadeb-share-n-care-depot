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

const isValidUserData = (data) => {
  const {
    user_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = data;
  const errors = [];

  if (!user_name) {
    errors.push('Missing required field: user_name');
  }
  if (!address) {
    errors.push('Missing required field: address');
  }
  if (!city) {
    errors.push('Missing required field: city');
  }
  if (!country) {
    errors.push('Missing required field: country');
  }
  if (!contact_name) {
    errors.push('Missing required field: contact_name');
  }
  if (!contact_position) {
    errors.push('Missing required field: contact_position');
  }
  if (!contact_phone) {
    errors.push('Missing required field: contact_phone');
  } else if (!isValidPhone(contact_phone)) {
    errors.push('Invalid phone number format for contact_phone');
  }
  if (!contact_email) {
    errors.push('Missing required field: contact_email');
  } else if (!isValidEmail(contact_email)) {
    errors.push('Invalid email format for contact_email');
  }
  
  return errors;
};


module.exports = {
  isValidEmail,
  isValidPhone,
  isValidInventoryData,
  isValidUserData
};