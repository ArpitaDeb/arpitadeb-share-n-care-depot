const nodemailer = require("nodemailer");
const { confirmationTemplate } = require("./confirmationTemplate");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (transporter, recipientEmail) => {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: recipientEmail,
      subject: "Notification regarding your reservation request at Share N Care Depot",
      html:' <p> html code </p>'
      // html: confirmationTemplate(newOrderItem, start_date, end_date, item_name),
    };
    try {
    await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error("Error sending the email:", error);
  }
}

module.exports = {
  sendMail
};