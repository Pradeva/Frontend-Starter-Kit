'use client';

// Error boundary bawaan Next.js App Router. Menangkap error render di
// seluruh segmen. Harus client component.
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Di produksi, kirim ke layanan monitoring (Sentry, dll) di sini.
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold text-slate-800">Terjadi kesalahan</h1>
      <p className="max-w-md text-sm text-slate-600">
        Maaf, ada yang tidak beres. Coba lagi.
      </p>
      <Button onClick={() => reset()}>Coba lagi</Button>
    </div>
  );
}
