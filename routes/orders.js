const express = require('express');
const router = express.Router();

let Order;
try { Order = require('../models/Order'); } catch (e) {}

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const { name, email, whatsapp, serviceType, description } = req.body;

    if (!name || !whatsapp || !serviceType) {
      return res.status(400).json({ success: false, message: 'Name, WhatsApp number and Service are required!' });
    }

    // Try saving to database if available
    try {
      if (Order) {
        const dbOrder = new Order({ name, email, whatsapp, serviceType, description });
        await dbOrder.save();
        console.log('💾 Order saved to database');
      }
    } catch (dbErr) {
      console.warn('⚠️  DB save skipped');
    }

    // WhatsApp message to OWNER (Saurabh) with all client details
    const ownerWhatsappMsg = encodeURIComponent(
      `🎬 *NEW ORDER — S3 Cinematics*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Client Name:* ${name}\n` +
      `📧 *Email:* ${email || 'Not provided'}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n\n` +
      `🎯 *Service Required:* ${serviceType}\n` +
      `📝 *Details:* ${description || 'No additional details'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📅 *Date:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n` +
      `🌐 *Source:* S3 Cinematics Website\n\n` +
      `_Please reply to confirm the order._`
    );
    const ownerWhatsappUrl = `https://wa.me/919793483930?text=${ownerWhatsappMsg}`;

    // WhatsApp message FROM client to owner
    const clientToOwnerMsg = encodeURIComponent(
      `Hi! I just placed an order on S3 Cinematics website.\n\n` +
      `📋 *My Order Details:*\n` +
      `👤 Name: ${name}\n` +
      `🎯 Service: ${serviceType}\n` +
      `📝 Details: ${description || 'Will discuss on call'}\n\n` +
      `Please confirm my order. Thank you! 🙏`
    );
    const clientWhatsappUrl = `https://wa.me/919793483930?text=${clientToOwnerMsg}`;

    // Send Email using Nodemailer
    try {
      const nodemailer = require('nodemailer');
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'saurabhkumarprajapati2005@gmail.com',
          subject: `New Order from ${name} - S3 Cinematics`,
          html: `
            <h2>New Order Received 🎬</h2>
            <p><strong>Client Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Service Required:</strong> ${serviceType}</p>
            <p><strong>Details:</strong><br/>${(description || 'No additional details').replace(/\\n/g, '<br/>')}</p>
            <hr/>
            <p><em>Source: S3 Cinematics Website</em></p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✉️ Email sent successfully for order from ${name}`);
      } else {
        console.warn('⚠️ Email credentials not found in .env, skipping email notification');
      }
    } catch (emailErr) {
      console.error('⚠️ Failed to send email:', emailErr.message);
    }

    console.log(`📱 New Order: ${name} | ${serviceType} | ${whatsapp}`);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: { name, email, whatsapp, serviceType, description },
      clientWhatsappUrl,
      ownerWhatsappUrl
    });

  } catch (error) {
    console.error('Order error:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to place order' });
  }
});

module.exports = router;
