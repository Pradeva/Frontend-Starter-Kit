import { api } from '@/lib/httpClient';

// Modul contoh (blueprint fitur CRUD). Copy-rename untuk resource nyata.
// Nyambung ke endpoint /posts di Express-Modular-Skeleton.
export const postService = {
  async list() {
    const res = await api.get('/posts');
    return res.data.data;
  },

  async get(id) {
    const res = await api.get(`/posts/${id}`);
    return res.data.data;
  },

  async create({ title, content }) {
    const res = await api.post('/posts', { title, content });
    return res.data.data;
  },

  async update(id, { title, content }) {
    const res = await api.put(`/posts/${id}`, { title, content });
    return res.data.data;
  },

  async remove(id) {
    const res = await api.delete(`/posts/${id}`);
    return res.data.data;
  },
};
