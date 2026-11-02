'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '@/lib/queryClient';

// Membungkus aplikasi dengan provider yang butuh berjalan di client:
// React Query + Toaster notifikasi.
export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
