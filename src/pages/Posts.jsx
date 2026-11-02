import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/features/posts/postSchemas';
import {
  usePosts,
  useCreatePost,
  useDeletePost,
} from '@/features/posts/usePosts';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FullPageSpinner } from '@/components/ui/Spinner';

// Modul contoh: daftar + buat + hapus post. Blueprint untuk fitur CRUD nyata.
export default function Posts() {
  const { data: posts, isLoading, isError } = usePosts();
  const createPost = useCreatePost();
  const deletePost = useDeletePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postSchema) });

  const onSubmit = (values) =>
    createPost.mutate(values, { onSuccess: () => reset() });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-slate-800">Posts</h1>

      <Card>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Buat post baru</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            id="title"
            label="Judul"
            placeholder="Judul post"
            error={errors.title?.message}
            {...register('title')}
          />
          <Input
            id="content"
            label="Konten"
            placeholder="Isi post"
            error={errors.content?.message}
            {...register('content')}
          />
          <div>
            <Button type="submit" loading={createPost.isPending}>
              Tambah
            </Button>
          </div>
        </form>
      </Card>

      {isLoading && <FullPageSpinner />}
      {isError && <p className="text-sm text-red-600">Gagal memuat data posts.</p>}

      {posts && posts.length === 0 && (
        <p className="text-sm text-slate-500">Belum ada post.</p>
      )}

      <div className="flex flex-col gap-3">
        {posts?.map((post) => (
          <Card key={post.id} className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-800">{post.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{post.content}</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deletePost.mutate(post.id)}
              loading={deletePost.isPending && deletePost.variables === post.id}
            >
              Hapus
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
