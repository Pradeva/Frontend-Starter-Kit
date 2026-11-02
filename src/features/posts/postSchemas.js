import { z } from 'zod';

// Selaras dengan postValidation.js di backend: title 1-150, content min 1.
export const postSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi').max(150),
  content: z.string().min(1, 'Konten wajib diisi'),
});
