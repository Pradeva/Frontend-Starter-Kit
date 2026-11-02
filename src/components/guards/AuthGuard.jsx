'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/authStore';
import { FullPageSpinner } from '@/components/ui/Spinner';

// Melindungi halaman yang butuh login. Karena token disimpan di localStorage
// (hanya tersedia di client), pengecekan dilakukan setelah komponen mount
// untuk menghindari mismatch hydration SSR.
export function AuthGuard({ children }) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [accessToken, router]);

  if (!checked) {
    return <FullPageSpinner />;
  }

  return children;
}
