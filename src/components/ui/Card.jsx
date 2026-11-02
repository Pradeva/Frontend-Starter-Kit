import { cn } from '@/lib/cn';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200/80 bg-white p-6 shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
