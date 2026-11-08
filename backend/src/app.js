const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const sanitizeInput = require('./middlewares/sanitize');
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require('./utils/apiError');

// Route imports
const healthRoutes = require('./routes/healthRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Security and performance middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization against NoSQL injection
app.use(sanitizeInput);

// Request logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

// API Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'E-Commerce Product Catalog API',
    version: '1.0.0',
    documentation: '/api/v1/health',
    endpoints: {
      health: '/api/v1/health',
      categories: '/api/v1/categories',
      products: '/api/v1/products',
      facets: '/api/v1/products/facets'
    }
  });
});

// 404 Catch-all handler
app.use((req, res, next) => {
  next(ApiError.notFound(`Cannot find endpoint ${req.method} ${req.originalUrl} on this server`));
});

// Centralized error handling
app.use(errorHandler);

module.exports = app;

