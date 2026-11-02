import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { postService } from './postService';

const getApiError = (error, fallback) =>
  error?.response?.data?.message || fallback;

const POSTS_KEY = ['posts'];

export function usePosts() {
  return useQuery({
    queryKey: POSTS_KEY,
    queryFn: postService.list,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: POSTS_KEY });
      toast.success('Post dibuat');
    },
    onError: (e) => toast.error(getApiError(e, 'Gagal membuat post')),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }) => postService.update(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: POSTS_KEY });
      toast.success('Post diperbarui');
    },
    onError: (e) => toast.error(getApiError(e, 'Gagal memperbarui post')),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => postService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: POSTS_KEY });
      toast.success('Post dihapus');
    },
    onError: (e) => toast.error(getApiError(e, 'Gagal menghapus post')),
  });
}
