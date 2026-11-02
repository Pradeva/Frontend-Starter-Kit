import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-5xl font-bold text-brand-600">404</p>
      <h1 className="text-xl font-semibold text-slate-800">Halaman tidak ditemukan</h1>
      <Link to="/dashboard">
        <Button>Kembali ke dashboard</Button>
      </Link>
    </div>
  );
}
