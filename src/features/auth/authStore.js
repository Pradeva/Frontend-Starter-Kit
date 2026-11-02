import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Menyimpan state autentikasi (token + user) dan mem-persist ke localStorage
// agar sesi tetap ada setelah refresh halaman.
//
// Catatan keamanan: menyimpan token di localStorage itu praktis tapi rentan
// XSS. Untuk kebutuhan keamanan lebih tinggi, pertimbangkan menyimpan refresh
// token di httpOnly cookie (butuh penyesuaian di backend).
export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      // Dipanggil setelah login/refresh berhasil.
      setAuth: ({ accessToken, refreshToken, user }) =>
        set((state) => ({
          accessToken: accessToken ?? state.accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          user: user ?? state.user,
        })),

      // Hanya memperbarui pasangan token (dipakai saat auto-refresh).
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),

      // Membersihkan semua state auth (logout).
      clearAuth: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Helper non-hook untuk dipakai di luar komponen React (mis. interceptor axios).
export const authStorage = {
  getState: useAuthStore.getState,
  setState: useAuthStore.setState,
};
