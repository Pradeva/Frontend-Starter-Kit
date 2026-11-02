import { cn } from '@/lib/cn';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-soft hover:bg-brand-700 focus-visible:ring-brand-500',
  secondary:
    'bg-white text-slate-700 border border-slate-200 shadow-soft hover:bg-slate-50 focus-visible:ring-slate-300',
  danger:
    'bg-red-600 text-white shadow-soft hover:bg-red-700 focus-visible:ring-red-500',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading = false,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
