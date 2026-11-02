// Helper sederhana untuk menggabungkan className secara kondisional.
// Menerima string, falsy (diabaikan), dan array.
export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
}
