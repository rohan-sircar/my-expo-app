import axios from 'axios';
import { useAuthStore } from '~/app/stores/AuthStore';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:7800/api/v1';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const store = useAuthStore.getState();
      await store.clearCredentials();
    }
    return Promise.reject(error);
  }
);

export default api;
