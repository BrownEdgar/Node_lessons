const mongoose = require('mongoose');

const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

// Uncaught Exception Handler
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  throw new Error(err.message);
});

// Start server
const startServer = () => {
  const server = app.listen(config.port, () => {
    logger.info(`Server running in ${config.env} mode on port ${config.port}`);
  });

  // Graceful shutdown
  const gracefulShutdown = (signal) => {
    logger.info(`${signal} signal received: closing HTTP server`);

    server.close(() => {
      logger.info('HTTP server closed');

      // Close database connections
      mongoose.connection.close(false).then(() => {
        logger.info('MongoDB connection closed');
        process.exit(0);
      });
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  // Handle shutdown signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Unhandled Promise Rejection
  process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err);

    server.close(() => {
      process.exit(1);
    });
  });
};

// Connect to MongoDB
mongoose
  .connect(config.database.uri, config.database.options)
  .then(() => {
    logger.info('Connected to MongoDB');
    startServer();
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    throw new Error(err.message);
  });
