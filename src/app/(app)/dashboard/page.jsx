'use client';

import { useAuthStore } from '@/features/auth/authStore';
import { usePosts } from '@/features/posts/usePosts';
import { Card } from '@/components/ui/Card';

function StatCard({ label, value, hint }) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </Card>
  );
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: posts } = usePosts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Selamat datang, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Ringkasan singkat akun dan data kamu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Role"
          value={<span className="capitalize">{user?.role || '-'}</span>}
          hint="Tingkat akses akun"
        />
        <StatCard
          label="Total Posts"
          value={posts?.length ?? '-'}
          hint="Jumlah post tersimpan"
        />
        <StatCard label="Email" value={<span className="text-base">{user?.email}</span>} />
      </div>

      <Card>
        <h2 className="text-sm font-semibold text-slate-700">Mulai dari sini</h2>
        <ul className="mt-3 flex list-inside list-disc flex-col gap-1.5 text-sm text-slate-600">
          <li>Buka menu <span className="font-medium">Posts</span> untuk mencoba CRUD.</li>
          <li>Menu <span className="font-medium">Users</span> hanya untuk admin.</li>
          <li>Modul Posts adalah contoh — salin polanya untuk fitur baru.</li>
        </ul>
      </Card>
    </div>
  );
}
