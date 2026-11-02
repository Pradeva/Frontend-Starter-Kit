import { useAuthStore } from '@/features/auth/authStore';
import { Card } from '@/components/ui/Card';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
      <Card>
        <p className="text-slate-700">
          Halo, <span className="font-semibold">{user?.name}</span>.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Role kamu: <span className="font-medium">{user?.role}</span>
        </p>
      </Card>
    </div>
  );
}
