const nodemailer = require("nodemailer");
const { confirmationTemplate } = require("./confirmationTemplate");
const sendNotification = async (req, res) => {
  try {
    const { recipientEmail } = req.body;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      template: confirmationTemplate(newOrderItem, start_date, end_date, item_name),
      from: process.env.SMTP_FROM,
      to: recipientEmail,
      subject: "Notification regarding your reservation request at Share N Care Depot",
    };
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending the email:", error);
    res
      .status(500)
      .json({ success: false, message: "Email sending failed." });
  }
}

module.exports = {
  sendNotification
};