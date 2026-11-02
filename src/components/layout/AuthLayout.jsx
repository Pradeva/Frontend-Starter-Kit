import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';

// Layout untuk halaman auth (login/register). Kalau user sudah login,
// langsung arahkan ke dashboard.
export function AuthLayout() {
  const accessToken = useAuthStore((s) => s.accessToken);

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-brand-700">
          Frontend Starter Kit
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
