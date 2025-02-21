const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
// Add this new route while keeping your existing code

app.post('/api/chatbot/send-confirmation', async (req, res) => {
    const { name, email, phone, comment } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your message',
      html: userEmailTemplate
    };
  
    try {
      await transporter.sendMail(userMailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });
  

app.post('/send-email', async (req, res) => {
  const { name, email, phone, comment } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // User email template with modern design
// User Email Template
const userEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Professional Services</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6;">
  <!-- Header Section -->
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); padding: 32px 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; text-align: center; font-weight: 600;">Thank You for Choosing Us</h1>
      </td>
    </tr>
  </table>
  
  <!-- Main Content -->
  <table role="presentation" style="max-width: 680px; margin: 24px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 40px;">
        <!-- Greeting -->
        <h2 style="color: #1e293b; margin-bottom: 24px; font-size: 26px; font-weight: 500;">Hello ${name},</h2>
        
        <p style="color: #475569; margin-bottom: 24px; font-size: 16px;">
          We appreciate you reaching out to us. Your inquiry has been received, and our dedicated team will review it promptly.
        </p>

        <!-- Services Overview -->
        <div style="background: linear-gradient(to right, #f8fafc, #f1f5f9); padding: 24px; border-radius: 8px; margin-bottom: 32px;">
          <h3 style="color: #334155; margin: 0 0 16px 0; font-size: 20px;">Our Professional Services Include:</h3>
          <ul style="color: #475569; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 12px;">Custom Solutions Tailored to Your Needs</li>
            <li style="margin-bottom: 12px;">Expert Consultation and Support</li>
            <li style="margin-bottom: 12px;">Innovative Technology Implementation</li>
            <li style="margin-bottom: 12px;">Comprehensive Project Management</li>
          </ul>
        </div>

        <!-- Message Details -->
        <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; border-left: 4px solid #7c3aed; margin-bottom: 32px;">
          <h3 style="color: #334155; margin: 0 0 16px 0; font-size: 20px;">Your Message Details:</h3>
          
          <table role="presentation" style="width: 100%;">
            <tr>
              <td style="padding: 8px 0;">
                <strong style="color: #7c3aed;">Name:</strong>
                <span style="color: #475569; margin-left: 8px;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <strong style="color: #7c3aed;">Email:</strong>
                <span style="color: #475569; margin-left: 8px;">${email}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <strong style="color: #7c3aed;">Phone:</strong>
                <span style="color: #475569; margin-left: 8px;">${phone}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <strong style="color: #7c3aed;">Message:</strong>
                <p style="color: #475569; margin: 8px 0 0 0;">${comment}</p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Next Steps -->
        <div style="margin-bottom: 32px;">
          <h3 style="color: #334155; margin: 0 0 16px 0; font-size: 20px;">What to Expect:</h3>
          <p style="color: #475569; margin: 0 0 12px 0;">
            Our team will carefully review your inquiry and get back to you within 24-48 business hours with a personalized response.
          </p>
          <p style="color: #475569; margin: 0;">
            Meanwhile, feel free to explore our comprehensive service offerings on our website.
          </p>
        </div>
      </td>
    </tr>
  </table>
  
  <!-- Footer -->
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 24px 0; text-align: center; background-color: #f1f5f9;">
        <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px;">
          © ${new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <p style="color: #64748b; margin: 0; font-size: 14px;">
          This email was sent in response to your inquiry. Please add us to your safe senders list.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Admin Email Template
const adminEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Inquiry Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6;">
  <!-- Header -->
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 28px 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-align: center; font-weight: 600;">New Client Inquiry Alert</h1>
      </td>
    </tr>
  </table>
  
  <!-- Main Content -->
  <table role="presentation" style="max-width: 680px; margin: 24px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 40px;">
        <!-- Priority Status -->
        <div style="background-color: #fef2f2; color: #991b1b; padding: 16px; border-radius: 8px; margin-bottom: 24px; text-align: center; font-weight: 500;">
          New Client Inquiry - Requires Immediate Attention
        </div>

        <!-- Contact Details -->
        <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; border-left: 4px solid #2563eb;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px;">Contact Information:</h2>
          
          <table role="presentation" style="width: 100%;">
            <tr>
              <td style="padding: 10px 0;">
                <strong style="color: #2563eb;">Name:</strong>
                <span style="color: #475569; margin-left: 8px;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <strong style="color: #2563eb;">Email:</strong>
                <span style="color: #475569; margin-left: 8px;">${email}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <strong style="color: #2563eb;">Phone:</strong>
                <span style="color: #475569; margin-left: 8px;">${phone}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <strong style="color: #2563eb;">Message:</strong>
                <p style="color: #475569; margin: 8px 0 0 0; background-color: #ffffff; padding: 12px; border-radius: 6px;">${comment}</p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Action Required -->
        <div style="margin-top: 24px; padding: 20px; background-color: #f0f9ff; border-radius: 8px;">
          <h3 style="color: #0c4a6e; margin: 0 0 12px 0; font-size: 18px;">Required Actions:</h3>
          <ul style="color: #475569; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Review inquiry details</li>
            <li style="margin-bottom: 8px;">Assess service requirements</li>
            <li style="margin-bottom: 8px;">Prepare customized response</li>
            <li style="margin-bottom: 0;">Respond within 24-48 business hours</li>
          </ul>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for your message',
    html: userEmailTemplate
  };

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    html: adminEmailTemplate
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});