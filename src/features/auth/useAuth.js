import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authService } from './authService';
import { useAuthStore } from './authStore';

// Mengambil pesan error yang ramah dari response backend (format { message }).
const getApiError = (error, fallback) =>
  error?.response?.data?.message || fallback;

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data);
      toast.success('Login berhasil');
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error(getApiError(error, 'Login gagal'));
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Registrasi berhasil, silakan login');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(getApiError(error, 'Registrasi gagal'));
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: async () => {
      // Best-effort: cabut refresh token di server. Abaikan error agar
      // logout lokal tetap jalan walau request gagal.
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        try {
          await authService.logout(refreshToken);
        } catch {
          // diabaikan
        }
      }
    },
    onSettled: () => {
      clearAuth();
      toast.success('Logout berhasil');
      router.push('/login');
    },
  });
}
