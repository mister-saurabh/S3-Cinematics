const express = require('express');
const router = express.Router();

let Contact;
try { Contact = require('../models/Contact'); } catch (e) {}

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Try DB save
    try {
      if (Contact) {
        const contact = new Contact({ name, email, message });
        await contact.save();
      }
    } catch (dbErr) {
      console.warn('⚠️  DB save skipped');
    }

    // WhatsApp URL for contact message
    const whatsappMsg = encodeURIComponent(
      `💬 *Contact Message — S3 Cinematics*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📝 *Message:* ${message}\n\n` +
      `_Sent from S3 Cinematics Website_`
    );
    const whatsappUrl = `https://wa.me/919793483930?text=${whatsappMsg}`;

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
          subject: `New Contact Message from ${name} - S3 Cinematics`,
          text: `You have received a new contact message.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log(`✉️ Email sent successfully for contact from ${name}`);
      } else {
        console.warn('⚠️ Email credentials not found in .env, skipping email notification');
      }
    } catch (emailErr) {
      console.error('⚠️ Failed to send email:', emailErr.message);
    }

    console.log(`💬 Contact: ${name} | ${email}`);

    res.status(201).json({ success: true, message: 'Message sent!', whatsappUrl });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
