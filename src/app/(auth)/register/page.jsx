'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { registerSchema } from '@/features/auth/authSchemas';
import { useRegister } from '@/features/auth/useAuth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const registerUser = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (values) => registerUser.mutate(values);

  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Daftar</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          id="name"
          label="Nama"
          placeholder="Nama lengkap"
          error={errors.name?.message}
          {...register('name')}
        />
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
          placeholder="Minimal 6 karakter"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" loading={registerUser.isPending} className="w-full">
          Daftar
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        Sudah punya akun?{' '}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          Masuk
        </Link>
      </p>
    </Card>
  );
}
