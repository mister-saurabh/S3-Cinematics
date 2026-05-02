const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const orderRoutes = require('./routes/orders');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB Connected Successfully');
    } else {
      console.warn('⚠️ No MONGODB_URI found - running without database. Orders work via WhatsApp.');
    }
  } catch (err) {
    console.warn('⚠️  MongoDB connection failed:', err.message);
  }
};
connectDB();

// API Routes
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 S3 Cinematics Server running on port ${PORT}`);
  });
}

// Export for Vercel Serverless
module.exports = app;
