require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { seedCategories, seedProducts } = require('./seedData');

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecom_catalog';

  try {
    console.log(`[Seed] Connecting to MongoDB: ${uri}`);
    await mongoose.connect(uri);

    console.log('[Seed] Clearing existing categories and products...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('[Seed] Seeding hierarchical categories...');
    const categoryMap = new Map();

    // 1. First insert root categories (no parent)
    const rootCategoriesData = seedCategories.filter((c) => !c.parentSlug);
    for (const catData of rootCategoriesData) {
      const cat = await Category.create({
        name: catData.name,
        slug: catData.slug,
        description: catData.description,
        displayOrder: catData.displayOrder,
        image: catData.image,
        icon: catData.icon,
        ancestors: []
      });
      categoryMap.set(cat.slug, cat);
    }

    // 2. Next insert subcategories with parent and ancestor references
    const subCategoriesData = seedCategories.filter((c) => c.parentSlug);
    for (const subData of subCategoriesData) {
      const parent = categoryMap.get(subData.parentSlug);
      if (!parent) {
        console.warn(`[Seed] Warning: parent ${subData.parentSlug} not found for ${subData.slug}`);
        continue;
      }

      const sub = await Category.create({
        name: subData.name,
        slug: subData.slug,
        description: subData.description,
        displayOrder: subData.displayOrder,
        image: subData.image,
        icon: subData.icon,
        parent: parent._id,
        ancestors: [
          ...parent.ancestors,
          { _id: parent._id, name: parent.name, slug: parent.slug }
        ]
      });
      categoryMap.set(sub.slug, sub);
    }

    console.log(`[Seed] Successfully seeded ${categoryMap.size} categories.`);

    // 3. Insert products with resolved category and categoryPath
    console.log('[Seed] Seeding products...');
    const productsToInsert = [];

    for (const prodData of seedProducts) {
      const category = categoryMap.get(prodData.categorySlug);
      if (!category) {
        console.warn(`[Seed] Category '${prodData.categorySlug}' not found for product '${prodData.name}'`);
        continue;
      }

      // Ancestors array + self ID for instant hierarchical query filtering
      const categoryPath = [
        ...category.ancestors.map((a) => a._id),
        category._id
      ];

      productsToInsert.push({
        name: prodData.name,
        slug: prodData.slug,
        sku: prodData.sku,
        brand: prodData.brand,
        category: category._id,
        categoryPath,
        shortDescription: prodData.shortDescription,
        description: prodData.description,
        price: prodData.price,
        compareAtPrice: prodData.compareAtPrice,
        inventory: prodData.inventory,
        ratings: prodData.ratings,
        tags: prodData.tags,
        specifications: prodData.specifications,
        images: prodData.images,
        featured: prodData.featured,
        isActive: true
      });
    }

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`[Seed] Successfully seeded ${insertedProducts.length} products.`);

    // 4. Ensure all indexes are built
    console.log('[Seed] Synchronizing compound and text indexes...');
    await Category.syncIndexes();
    await Product.syncIndexes();

    const productIndexes = await Product.collection.indexes();
    console.log(`[Seed] Product Indexes Active (${productIndexes.length}):`);
    productIndexes.forEach((idx) => {
      console.log(`  - ${idx.name}: ${JSON.stringify(idx.key)}`);
    });

    console.log('\n✅ Database seeding and indexing completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();

