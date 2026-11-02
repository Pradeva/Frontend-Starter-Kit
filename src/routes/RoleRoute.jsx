import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';

// Membatasi route berdasarkan role (mis. hanya 'admin'), sejalan dengan
// middleware authorize(...roles) di backend.
export function RoleRoute({ allowedRoles = [] }) {
  const user = useAuthStore((s) => s.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
