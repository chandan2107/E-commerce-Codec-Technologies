const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    isPrimary: { type: Boolean, default: false }
  },
  { _id: false }
);

const SpecificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
      index: true
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      index: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
      index: true
    },
    // Denormalized category ancestor path for sub-tree filtering
    categoryPath: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true
      }
    ],
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    description: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
      index: true
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare-at price must be positive'],
      default: null
    },
    inventory: {
      stockQuantity: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0
      },
      lowStockThreshold: {
        type: Number,
        default: 5
      },
      isAvailable: {
        type: Boolean,
        default: true,
        index: true
      }
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be below 0'],
        max: [5, 'Rating cannot exceed 5'],
        index: true
      },
      count: {
        type: Number,
        default: 0,
        min: 0
      }
    },
    specifications: [SpecificationSchema],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],
    images: [ImageSchema],
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function () {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

// Compound Indexes for optimized search, filtering, and sorting
ProductSchema.index({ category: 1, price: 1, isActive: 1 });
ProductSchema.index({ categoryPath: 1, isActive: 1, price: 1 });
ProductSchema.index({ category: 1, 'ratings.average': -1, isActive: 1 });
ProductSchema.index({ brand: 1, price: 1, isActive: 1 });
ProductSchema.index({ 'inventory.isAvailable': 1, isActive: 1, price: 1 });
ProductSchema.index({ isActive: 1, createdAt: -1 });
ProductSchema.index({ tags: 1, isActive: 1 });

// Full-text search index with weighted fields
ProductSchema.index(
  {
    name: 'text',
    brand: 'text',
    tags: 'text',
    description: 'text'
  },
  {
    weights: {
      name: 10,
      brand: 6,
      tags: 4,
      description: 1
    },
    name: 'ProductTextIndex'
  }
);

// Auto-sync inventory availability status before saving
ProductSchema.pre('save', function () {
  if (this.inventory) {
    this.inventory.isAvailable = this.inventory.stockQuantity > 0;
  }
});

module.exports = mongoose.model('Product', ProductSchema);

