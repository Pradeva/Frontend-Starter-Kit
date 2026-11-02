import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/httpClient';
import { Card } from '@/components/ui/Card';
import { FullPageSpinner } from '@/components/ui/Spinner';

// Halaman admin-only. GET /users di backend dibatasi role 'admin'
// (authorize('admin')). Route ini juga dijaga RoleRoute di sisi frontend.
export default function Users() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/users');
      return res.data.data;
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-slate-800">Users (admin)</h1>

      {isLoading && <FullPageSpinner />}
      {isError && <p className="text-sm text-red-600">Gagal memuat data users.</p>}

      <div className="flex flex-col gap-2">
        {data?.map((u) => (
          <Card key={u.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">{u.name}</p>
              <p className="text-sm text-slate-500">{u.email}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {u.role}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
