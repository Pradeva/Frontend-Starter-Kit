import { QueryClient } from '@tanstack/react-query';

// Satu instance QueryClient untuk seluruh aplikasi.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000, // 30 detik
    },
  },
});
