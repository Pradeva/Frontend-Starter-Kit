import { redirect } from 'next/navigation';

// Root "/" langsung diarahkan ke dashboard. Guard di (app) akan
// mengalihkan ke /login bila belum terautentikasi.
export default function Home() {
  redirect('/dashboard');
}
