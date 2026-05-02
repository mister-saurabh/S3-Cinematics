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

// MongoDB Connection (optional - app works without it too)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/s3cinematics');
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.warn('⚠️  MongoDB not available - running without database. Orders will still work via email/WhatsApp.');
  }
};
connectDB();

// API Routes
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 S3 Cinematics Server running on port ${PORT}`);
});
