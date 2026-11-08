import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to unwrap data
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMsg =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('[API Error]:', errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
);

export const api = {
  // Fetch paginated products with filters
  getProducts: async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value);
      }
    });
    return apiClient.get(`/products?${query.toString()}`);
  },

  // Fetch filter facets (dynamic counts, min/max prices)
  getFacets: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    return apiClient.get(`/products/facets?${query.toString()}`);
  },

  // Fetch single product by id or slug
  getProduct: async (idOrSlug) => {
    return apiClient.get(`/products/${idOrSlug}`);
  },

  // Fetch categories (tree or flat)
  getCategories: async (tree = true) => {
    return apiClient.get(`/categories?tree=${tree}`);
  },

  // System health check
  getHealth: async () => {
    return apiClient.get('/health');
  }
};

export default api;
