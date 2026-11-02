import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-5xl font-bold text-brand-600">404</p>
      <h1 className="text-xl font-semibold text-slate-800">Halaman tidak ditemukan</h1>
      <Link
        href="/dashboard"
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Kembali ke dashboard
      </Link>
    </div>
  );
}
