import { cn } from '@/lib/cn';

export function Spinner({ className }) {
  return (
    <span
      className={cn(
        'inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent',
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

// Komponen pembungkus untuk menampilkan spinner di tengah area penuh.
export function FullPageSpinner() {
  return (
    <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
