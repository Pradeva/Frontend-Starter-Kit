import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from './authService';
import { useAuthStore } from './authStore';

// Mengambil pesan error yang ramah dari response backend (format { message }).
const getApiError = (error, fallback) =>
  error?.response?.data?.message || fallback;

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data);
      toast.success('Login berhasil');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(getApiError(error, 'Login gagal'));
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Registrasi berhasil, silakan login');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(getApiError(error, 'Registrasi gagal'));
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { refreshToken, clearAuth } = useAuthStore.getState();

  return useMutation({
    mutationFn: async () => {
      // Best-effort: cabut refresh token di server. Abaikan error agar
      // logout lokal tetap jalan walau request gagal.
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
      navigate('/login');
    },
  });
}
