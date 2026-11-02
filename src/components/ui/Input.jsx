import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

// Input dengan label & pesan error opsional. forwardRef agar kompatibel
// dengan react-hook-form register().
export const Input = forwardRef(function Input(
  { label, error, className, id, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900',
          'placeholder:text-slate-400',
          'transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
          error &&
            'border-red-400 focus:border-red-500 focus:ring-red-500/30',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </div>
  );
});
