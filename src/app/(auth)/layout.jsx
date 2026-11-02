'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/authStore';

// Layout untuk halaman auth (login/register). Jika user sudah login,
// alihkan ke dashboard.
export default function AuthLayout({ children }) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace('/dashboard');
    }
  }, [accessToken, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Latar dekoratif */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-slate-50 to-slate-100" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white shadow-card">
            S
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-900">Starter Kit</h1>
            <p className="text-sm text-slate-500">Masuk untuk melanjutkan</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
