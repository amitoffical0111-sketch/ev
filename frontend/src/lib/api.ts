import axios from 'axios';
import { tokenStore } from '@/lib/tokenStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      tokenStore.clear();
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// API service functions
export const productsApi = {
  getAll: (params?: Record<string, string>) => api.get('/products', { params }),
  getFeatured: () => api.get('/products/featured'),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
  create: (data: FormData) => api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) => api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/products/${id}`),
  duplicate: (id: string) => api.post(`/products/${id}/duplicate`),
  compare: (ids: string[]) => api.post('/products/compare', { ids }),
};

export const categoriesApi = {
  getAll: () => api.get('/categories'),
  create: (data: object) => api.post('/categories', data),
  update: (id: string, data: object) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

export const bookingsApi = {
  create: (data: object) => api.post('/bookings', data),
  getAll: (params?: object) => api.get('/bookings', { params }),
  getById: (id: string) => api.get(`/bookings/${id}`),
  updateStatus: (id: string, status: string) => api.put(`/bookings/${id}/status`, { status }),
  getStats: () => api.get('/bookings/stats'),
};

export const dealersApi = {
  getAll: (params?: object) => api.get('/dealers', { params }),
  getNearby: (lat: number, lng: number) => api.get('/dealers/nearby', { params: { lat, lng } }),
  getById: (id: string) => api.get(`/dealers/${id}`),
  apply: (data: object) => api.post('/dealers/apply', data),
  create: (data: object) => api.post('/dealers', data),
  update: (id: string, data: object) => api.put(`/dealers/${id}`, data),
  delete: (id: string) => api.delete(`/dealers/${id}`),
};

export const settingsApi = {
  getAll: (group?: string) => api.get('/settings', { params: group ? { group } : {} }),
  update: (data: object) => api.put('/settings', data),
};

export const authApi = {
  login: (data: object) => api.post('/auth/login', data),
  register: (data: object) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: object) => api.put('/auth/me', data),
  changePassword: (data: object) => api.put('/auth/change-password', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => api.put(`/auth/reset-password/${token}`, { password }),
};

export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAnalytics: (period?: string) => api.get('/admin/analytics', { params: { period } }),
};

export const blogsApi = {
  getAll: (params?: object) => api.get('/blogs', { params }),
  getById: (id: string) => api.get(`/blogs/${id}`),
  create: (data: object) => api.post('/blogs', data),
  update: (id: string, data: object) => api.put(`/blogs/${id}`, data),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

export const faqsApi = {
  getAll: () => api.get('/faqs'),
  create: (data: object) => api.post('/faqs', data),
  update: (id: string, data: object) => api.put(`/faqs/${id}`, data),
  delete: (id: string) => api.delete(`/faqs/${id}`),
};

export const testimonialsApi = {
  getAll: () => api.get('/testimonials'),
  create: (data: object) => api.post('/testimonials', data),
  update: (id: string, data: object) => api.put(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete(`/testimonials/${id}`),
};

export const heroApi = {
  getAll: () => api.get('/hero-sliders'),
  create: (data: FormData) => api.post('/hero-sliders', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: object) => api.put(`/hero-sliders/${id}`, data),
  delete: (id: string) => api.delete(`/hero-sliders/${id}`),
};

export const galleryApi = {
  getAll: () => api.get('/gallery'),
  upload: (data: FormData) => api.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/gallery/${id}`),
};

export const careersApi = {
  getAll: () => api.get('/careers'),
  getById: (id: string) => api.get(`/careers/${id}`),
  apply: (id: string, data: FormData) => api.post(`/careers/${id}/apply`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  create: (data: object) => api.post('/careers', data),
  update: (id: string, data: object) => api.put(`/careers/${id}`, data),
  delete: (id: string) => api.delete(`/careers/${id}`),
};

export const financeApi = {
  getAll: () => api.get('/finance-partners'),
  create: (data: object) => api.post('/finance-partners', data),
  update: (id: string, data: object) => api.put(`/finance-partners/${id}`, data),
  delete: (id: string) => api.delete(`/finance-partners/${id}`),
};

export const serviceCentersApi = {
  getAll: () => api.get('/service-centers'),
  create: (data: object) => api.post('/service-centers', data),
  update: (id: string, data: object) => api.put(`/service-centers/${id}`, data),
  delete: (id: string) => api.delete(`/service-centers/${id}`),
};

export const newsApi = {
  getAll: (params?: object) => api.get('/news', { params }),
  getById: (id: string) => api.get(`/news/${id}`),
  create: (data: object) => api.post('/news', data),
  update: (id: string, data: object) => api.put(`/news/${id}`, data),
  delete: (id: string) => api.delete(`/news/${id}`),
};

export const ordersApi = {
  getAll: (params?: object) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: object) => api.post('/orders', data),
  update: (id: string, data: object) => api.put(`/orders/${id}`, data),
  delete: (id: string) => api.delete(`/orders/${id}`),
};

export const downloadsApi = {
  getAll: () => api.get('/downloads'),
  create: (data: FormData) => api.post('/downloads', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: object) => api.put(`/downloads/${id}`, data),
  delete: (id: string) => api.delete(`/downloads/${id}`),
};

export const usersApi = {
  getAll: (params?: object) => api.get('/users', { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: object) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};
