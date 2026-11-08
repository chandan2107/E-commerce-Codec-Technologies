require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 E-Commerce Catalog API server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
      console.log(`📋 API Health Check: http://localhost:${PORT}/api/v1/health`);
      console.log(`📦 Products Endpoint: http://localhost:${PORT}/api/v1/products`);
      console.log(`🏷️  Categories Endpoint: http://localhost:${PORT}/api/v1/categories`);
    });

    // Graceful shutdown handling
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log('[Server] HTTP server closed gracefully');
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    };

    process.on('SIGTERM', exitHandler);
    process.on('SIGINT', exitHandler);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

