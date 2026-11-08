const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');

router.get('/', async (req, res, next) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    let productCount = 0;
    let categoryCount = 0;
    let productIndexes = [];

    if (isDbConnected) {
      [productCount, categoryCount, productIndexes] = await Promise.all([
        Product.countDocuments({ isActive: true }),
        Category.countDocuments({ isActive: true }),
        Product.collection.indexes().catch(() => [])
      ]);
    }

    const healthData = {
      status: isDbConnected ? 'UP' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        status: isDbConnected ? 'CONNECTED' : 'DISCONNECTED',
        name: mongoose.connection.name,
        host: mongoose.connection.host
      },
      catalog: {
        totalProducts: productCount,
        totalCategories: categoryCount,
        productIndexesCount: productIndexes.length
      },
      environment: process.env.NODE_ENV || 'development'
    };

    return ApiResponse.success(res, healthData, 'System health OK');
  } catch (error) {
    next(error);
  }
});

module.exports = router;

