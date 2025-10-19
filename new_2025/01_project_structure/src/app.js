const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const config = require('./config');
const { errorConverter, errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (config.cors.origins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies
  })
);

// Parse JSON request body
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Gzip compression
app.use(compression());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
  });
});

// API Routes
app.use('/api/v1/users', require('./routes/user.routes'));
// app.use('/api/v1/auth', require('./routes/auth.routes'));
// app.use('/api/v1/posts', require('./routes/post.routes'));

// 404 handler
app.use(notFoundHandler);

// Error handling
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
