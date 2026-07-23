const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to, subject, html, text,
  };
  return await transporter.sendMail(mailOptions);
};

const bookingConfirmationEmail = (booking) => ({
  subject: `Booking Confirmed - ${booking.bookingId}`,
  html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#5FAF00;padding:20px;text-align:center">
        <h1 style="color:white;margin:0">Real E Bikes</h1>
      </div>
      <div style="padding:30px">
        <h2>Booking Confirmed!</h2>
        <p>Dear ${booking.customer.name},</p>
        <p>Your ${booking.type === 'test_ride' ? 'test ride' : 'booking'} has been confirmed.</p>
        <div style="background:#f5f5f5;padding:15px;border-radius:8px;margin:20px 0">
          <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
          <p><strong>Date:</strong> ${booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString() : 'TBD'}</p>
          <p><strong>Status:</strong> ${booking.status}</p>
        </div>
        <p>Our team will contact you shortly.</p>
        <p>Thank you for choosing Real E Bikes!</p>
      </div>
    </div>
  `,
});

module.exports = { sendEmail, bookingConfirmationEmail };
