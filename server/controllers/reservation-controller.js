const knex = require('knex')(require('../knexfile'));
const moment = require('moment');
const { isValidOrderItemData } = require('../utils/validator');
const { calculateAvailability } = require('../utils/Availability');

const nodemailer = require("nodemailer");
const { confirmationTemplate } = require("../service/email/confirmationTemplate");

const index = async (req, res) => {
  try {
    let query = knex('order');
    const data = await query;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving order items: ${err}`);
  }
};
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (transporter, newOrderItem, start_date, end_date, item_name, recipientEmail) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: recipientEmail,
    subject: "Notification regarding your reservation request at Share N Care Depot",
    html: confirmationTemplate(newOrderItem, start_date, end_date, item_name),
  };
  try {
    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error("Error sending the email:", error);
  }
}
const postOrderItem = async (req, res) => {
  const errors = await isValidOrderItemData(req, res);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const borrower_id = req.body.borrower_id;
  const inventory_id = req.body.inventory_id;
  const quantity = req.body.quantity;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;

  const postData = {
    borrower_id,
    inventory_id,
    quantity,
    start_date,
    end_date,
  };

  try {
    const item = await knex
      .select('inventories.item_name')
      .from('inventories')
      .where({ id: inventory_id }).first();
    const item_name = item.item_name;
    const recipient = await knex
      .select('user.email')
      .from('user')
      .where({ id: borrower_id }).first();
    const recipientEmail = recipient.email;
    const data = await knex('order').insert(postData);
    const newOrderItem = data[0];
    const createdOrderItem = await knex('order').where({ id: newOrderItem }).first();

    await sendMail(transporter, newOrderItem, start_date, end_date, item_name, recipientEmail);
    res.status(201).json({ createdOrderItem });
  } catch (err) {
    res.status(500).json({ message: `Error creating the Order item` });
  }
}

const durationAvailability = async (req, res) => {
  const { inventoryId } = req.params;
  try {
    const reservations = await knex
      .select('order.start_date', 'order.end_date')
      .from('order')
      .where({ inventory_id: inventoryId });

    const today = new Date();
    const endDate = moment(today).add(1, "month").toDate();
    
    let date = today;
    let array = [];
    
    while (date <= endDate) {
      let match = false;
      for (const reservation of reservations) {
        if ((date >= new Date(reservation.start_date)) && (date < new Date(reservation.end_date))) {
          match = true;
          break;
        }
      } 
      if (!match && !reservations.some(reservation => moment(date).isSame(reservation.end_date, 'day'))) {
        array.push(date);
      }
      date = moment(date).add(1, "day").toDate();
    }
    
    const formattedDates = array.map(date => {
      return moment(date).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(Central Standard Time)]");
    });
    
    res.json(formattedDates);    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const existingReservation = async (req, res) => {
  const { inventoryId } = req.params;
  try {
    const reservations = await knex
      .select('order.start_date', 'order.end_date')
      .from('order')
      .where({ inventory_id: inventoryId });
    res.json(reservations);    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
  };

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

module.exports = {
  index,
  postOrderItem,
  singleOrder,
  orderItemsInventory,
  durationAvailability,
  existingReservation
};
