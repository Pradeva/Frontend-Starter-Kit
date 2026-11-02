import { api } from '@/lib/httpClient';

// Lapisan service: membungkus panggilan API auth ke backend
// (Express-Modular-Skeleton). Response backend berformat:
//   { success, message, data }
// sehingga kita ambil `.data.data`.

export const authService = {
  async register({ name, email, password }) {
    const res = await api.post('/users/register', { name, email, password });
    return res.data.data;
  },

  async login({ email, password }) {
    const res = await api.post('/users/login', { email, password });
    // data: { accessToken, refreshToken, user }
    return res.data.data;
  },

  async logout(refreshToken) {
    const res = await api.post('/users/logout', { refreshToken });
    return res.data.data;
  },
};
