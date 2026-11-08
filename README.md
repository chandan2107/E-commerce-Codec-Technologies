# ATELIER — Scalable E-Commerce Product Catalog

A scalable, production-grade E-Commerce Product Catalog architecture built with **Node.js, Express, MongoDB (Mongoose), and React 19 + Tailwind CSS**.

Engineered for ultra-fast catalog lookups (<50ms response times) through compound indexing, weighted full-text search, category materialized path modeling, and dynamic MongoDB facet aggregation pipelines.

---

## Architecture Overview

```
                      ┌─────────────────────────────────────────┐
                      │    React 19 Frontend (Vite + Tailwind)  │
                      │  - Debounced Search & Live Facets       │
                      │  - URL Query Synchronized State         │
                      │  - Quick View Modal & Grid/List Switch  │
                      └────────────────────┬────────────────────┘
                                           │ HTTP / REST
                                           ▼
                      ┌─────────────────────────────────────────┐
                      │     Express 5.x RESTful API Gateway     │
                      │  - Input Sanitization (NoSQL injection) │
                      │  - Express-Validator Parameter Guards   │
                      │  - Centralized Error Handling           │
                      └────────────────────┬────────────────────┘
                                           │
                      ┌────────────────────▼────────────────────┐
                      │              Service Layer              │
                      │  - ProductService & CategoryService     │
                      │  - Hierarchy Resolution & Slugs         │
                      └────────────────────┬────────────────────┘
                                           │
                      ┌────────────────────▼────────────────────┐
                      │            Repository Layer             │
                      │  - Compound Query Builders              │
                      │  - Multi-stage $facet Aggregations      │
                      └────────────────────┬────────────────────┘
                                           │
                      ┌────────────────────▼────────────────────┐
                      │        MongoDB Database (v7.0+)         │
                      │  - 20 Active Compound & Text Indexes    │
                      │  - Materialized Path Category Tree      │
                      └─────────────────────────────────────────┘
```

---

## Key Engineering Highlights

### 1. Scalable Category Data Modeling (Materialized Path)
To prevent recursive graph queries when filtering products by high-level categories (e.g. browsing all items under *Electronics* should automatically include subcategories like *Audio & Headphones*, *Keyboards*, and *Cameras*), we employ the **Materialized Path** and denormalized `categoryPath` pattern:
- **`ancestors` Array**: Each subcategory stores an array of `{ _id, name, slug }` references up to the root.
- **`categoryPath` Array on Products**: When saving or updating a product, its full ancestor lineage is denormalized into `categoryPath`.
- **Query Optimization**: A single indexed query `{ categoryPath: targetCategoryId }` retrieves products across any sub-branch without recursive lookups.

### 2. Compound Indexing & Query Targeting
To maximize index coverage (Index Scans over Collection Scans) and ensure $O(\log N)$ search speeds:
- `ProductSchema.index({ category: 1, price: 1, isActive: 1 })`
- `ProductSchema.index({ categoryPath: 1, isActive: 1, price: 1 })`
- `ProductSchema.index({ category: 1, "ratings.average": -1, isActive: 1 })`
- `ProductSchema.index({ brand: 1, price: 1, isActive: 1 })`
- `ProductSchema.index({ "inventory.isAvailable": 1, isActive: 1, price: 1 })`
- `ProductSchema.index({ isActive: 1, createdAt: -1 })`

### 3. Weighted Full-Text Search
A MongoDB text index indexes critical product attributes with tailored weights:
```javascript
ProductSchema.index(
  { name: 'text', brand: 'text', tags: 'text', description: 'text' },
  {
    weights: { name: 10, brand: 6, tags: 4, description: 1 },
    name: 'ProductTextIndex'
  }
);
```
Text searches compute relevance using `{ score: { $meta: 'textScore' } }`.

### 4. Dynamic Facet Aggregation Pipeline
The `/api/v1/products/facets` endpoint computes real-time dynamic statistics using MongoDB's `$facet` operator in a single database round-trip:
- Dynamic `minPrice`, `maxPrice`, and `avgPrice`
- Distinct brand distribution with product counts
- Category tree distributions
- In-stock vs out-of-stock inventories

### 5. Input Sanitization & Validation
- **NoSQL Injection Defense**: Recursive sanitization middleware strips MongoDB operator keys (`$gt`, `$where`, etc.) and malicious dots from `req.body`, `req.query`, and `req.params`.
- **Express-Validator**: Strict query parameter guards ensure integer limits, valid price floats, allowed sort enums, and validated MongoDB ObjectIds.
- **Centralized Error Handler**: Translates Mongoose `CastError`, duplicate key `11000`, and validation violations into standard RESTful HTTP status codes (`400`, `404`, `409`, `422`).

---

## RESTful API Reference

### Products

#### `GET /api/v1/products`
Fetch paginated products with advanced search, filtering, and sorting.

| Query Parameter | Type | Description |
|:---|:---|:---|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Items per page (default: 12, max: 100) |
| `search` | string | Full-text search keyword |
| `category` | string | Category ID or slug (matches subcategories automatically) |
| `brand` | string | Comma-separated list of brands (e.g. `Sony,Keychron`) |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `minRating` | number | Minimum rating filter (e.g. `4.5`) |
| `inStock` | boolean | Filter by available inventory |
| `sort` | string | `newest`, `price-asc`, `price-desc`, `rating-desc`, `popular`, `title-asc` |

**Example Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "6af0a57bce3eb4bdd63954c7",
      "name": "Sony WH-1000XM5 Wireless Noise-Canceling",
      "slug": "sony-wh-1000xm5-wireless-noise-canceling",
      "sku": "SNY-WH1000XM5-BLK",
      "brand": "Sony",
      "price": 398,
      "compareAtPrice": 449,
      "inventory": { "stockQuantity": 42, "isAvailable": true },
      "ratings": { "average": 4.8, "count": 184 },
      "category": { "name": "Audio & Headphones", "slug": "audio-headphones" }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 12,
      "totalProducts": 18,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "executionTimeMs": 14
  }
}
```

#### `GET /api/v1/products/facets`
Retrieves aggregated statistics for the filter sidebar.

#### `GET /api/v1/products/:idOrSlug`
Retrieves single product details by MongoDB ObjectId or URL-friendly slug, along with related recommendations.

#### `POST /api/v1/products`
Creates a validated and sanitized product with automatic category path computation.

---

### Categories

#### `GET /api/v1/categories?tree=true`
Retrieves the full category tree hierarchy or flat list.

#### `GET /api/v1/categories/:slug`
Retrieves category details and its ancestor path.

#### `POST /api/v1/categories`
Creates a new category with ancestor linkage.

---

### System Health

#### `GET /api/v1/health`
Monitors database connectivity status, active uptime, catalog counts, and verified compound index counts.

---

## Directory Structure

```
├── backend/
│   ├── src/
│   │   ├── config/             # Database connection & retry logic
│   │   ├── controllers/        # Express HTTP controllers
│   │   ├── middlewares/        # Sanitization, validation, error handler
│   │   ├── models/             # Mongoose schemas (Category, Product)
│   │   ├── repositories/       # Data-access layer with query builders & facets
│   │   ├── routes/             # REST route declarations
│   │   ├── seeds/              # Rich realistic seed dataset & migration script
│   │   ├── services/           # Business logic & hierarchy resolution
│   │   ├── utils/              # ApiResponse, ApiError helpers
│   │   ├── validators/         # Express-validator schema guards
│   │   ├── app.js              # Express app definition & security middlewares
│   │   └── server.js           # Server bootstrap
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Header, FilterSidebar, ProductCard, QuickView, etc.
│   │   ├── context/            # FilterContext with URL query parameter sync
│   │   ├── hooks/              # useDebounce, custom reactive hooks
│   │   ├── services/           # Centralized Axios API client
│   │   ├── App.jsx             # Main catalog interface
│   │   ├── index.css           # Tailwind CSS configuration & tokens
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (v6.0 or higher running locally or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/chandan2107/E-commerce-Codec-Technologies.git
cd E-commerce-Codec-Technologies
```

### 2. Configure Environment Variables
In `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/ecom_catalog
CORS_ORIGIN=http://localhost:5173
```

### 3. Seed Database with Realistic Catalog Data
```bash
cd backend
npm install
npm run seed
```
This populates 10 categories across 3 levels, 18 high-end products, and builds 20 compound & text indexes.

### 4. Run the Backend Server
```bash
npm run dev
# Server running at http://localhost:5000
# Health check: http://localhost:5000/api/v1/health
```

### 5. Run the Frontend Application
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
# Client running at http://localhost:5173
```

---

## Frontend Design Philosophy
- **Anti-Slop Design**: Built with a minimal, high-end design inspired by modern Scandinavian design and luxury tech showcases (SSENSE, Linear, Apple).
- **Zero Layout Shifts**: Aspect-ratio locked image containers with smooth crossfade placeholders and tailored skeleton cards.
- **Complete Responsiveness**: Sticky filter sidebar for desktop, touch-friendly slide-over drawer for mobile.
- **Deep Linking**: Active search filters, categories, price ranges, and sorting preferences are bidirectionally synced with URL parameters for instant link sharing.

