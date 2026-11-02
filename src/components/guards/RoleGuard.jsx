'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/authStore';
import { FullPageSpinner } from '@/components/ui/Spinner';

// Membatasi halaman berdasarkan role (mis. 'admin'), sejalan dengan
// middleware authorize(...roles) di backend. Jika role tidak sesuai,
// alihkan ke /dashboard.
export function RoleGuard({ allowedRoles = [], children }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace('/dashboard');
    } else {
      setAllowed(true);
    }
  }, [user, allowedRoles, router]);

  if (!allowed) {
    return <FullPageSpinner />;
  }

  return children;
}
