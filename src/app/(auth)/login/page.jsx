'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { loginSchema } from '@/features/auth/authSchemas';
import { useLogin } from '@/features/auth/useAuth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values) => login.mutate(values);

  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Masuk</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" loading={login.isPending} className="w-full">
          Masuk
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        Belum punya akun?{' '}
        <Link href="/register" className="font-medium text-brand-600 hover:underline">
          Daftar
        </Link>
      </p>
    </Card>
  );
}
