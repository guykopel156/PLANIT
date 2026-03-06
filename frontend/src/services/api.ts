import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

const LOCAL_STORAGE_TOKEN_KEY = 'planit_access_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
