// Konfigurasi terpusat dari environment variable.
// Di Next.js, variabel yang diekspos ke browser harus diawali NEXT_PUBLIC_.
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
};
