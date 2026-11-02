// Konfigurasi terpusat yang dibaca dari environment variable.
// Vite hanya mengekspos variabel yang diawali dengan VITE_.
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
};
