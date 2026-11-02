import axios from 'axios';
import { config } from './config';
import { useAuthStore } from '@/features/auth/authStore';

// Instance axios terpusat. Semua request API lewat sini.
export const api = axios.create({
  baseURL: config.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

// --- Request interceptor: selipkan access token ke setiap request ---
api.interceptors.request.use((requestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    requestConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  return requestConfig;
});

// --- Response interceptor: auto-refresh saat 401 ---
// Mekanisme antrian agar beberapa request yang gagal 401 bersamaan hanya
// memicu SATU kali refresh, lalu diulang semua setelah token baru didapat.
let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  pendingQueue = [];
};

const forceLogout = () => {
  useAuthStore.getState().clearAuth();
  // Arahkan ke halaman login. Pakai location agar bekerja di luar React Router.
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Hanya tangani 401 yang belum pernah di-retry.
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) {
      forceLogout();
      return Promise.reject(error);
    }

    // Jika refresh sedang berjalan, antrekan request ini.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Pakai axios polos (bukan instance `api`) agar tidak kena interceptor lagi.
      const { data } = await axios.post(`${config.apiUrl}/users/refresh`, {
        refreshToken,
      });

      const newAccessToken = data?.data?.accessToken;
      const newRefreshToken = data?.data?.refreshToken;

      useAuthStore.getState().setTokens({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      forceLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
