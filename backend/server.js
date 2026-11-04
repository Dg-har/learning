require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Security
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { success: false, message: 'Too many requests, slow down!' },
});
app.use('/api/', limiter);

// Contact form specific stricter rate limit
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many messages sent. Try again later.' },
});

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', contactLimiter, require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/profile', require('./routes/profile'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '🚀 Server is alive!', timestamp: new Date() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
