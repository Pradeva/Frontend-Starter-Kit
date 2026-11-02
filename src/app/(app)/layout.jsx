'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { useAuthStore } from '@/features/auth/authStore';
import { useLogout } from '@/features/auth/useAuth';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/posts', label: 'Posts' },
  { href: '/users', label: 'Users', adminOnly: true },
];

// Inisial dari nama untuk avatar.
function initials(name = '') {
  return (
    name
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U'
  );
}

function AppShell({ children }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                S
              </span>
              <span className="font-bold text-slate-900">Starter Kit</span>
            </Link>
            <nav className="hidden gap-1 sm:flex">
              {navItems
                .filter((item) => !item.adminOnly || user?.role === 'admin')
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                {initials(user?.name)}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                <p className="text-xs capitalize text-slate-400">{user?.role}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => logout.mutate()}
              loading={logout.isPending}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Nav mobile */}
        <nav className="flex gap-1 border-t border-slate-100 px-4 py-2 sm:hidden">
          {navItems
            .filter((item) => !item.adminOnly || user?.role === 'admin')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <div className="animate-fade-in">{children}</div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-400">
          Frontend Starter Kit
        </div>
      </footer>
    </div>
  );
}

export default function AppGroupLayout({ children }) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
