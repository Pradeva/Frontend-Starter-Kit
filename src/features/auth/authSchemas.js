import { z } from 'zod';

// Schema validasi form auth. Dibuat selaras dengan aturan di backend
// (userValidation.js): name min 3, email valid, password min 6.
export const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').max(50),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter').max(128),
});
