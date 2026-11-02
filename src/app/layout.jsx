import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Frontend Starter Kit',
  description: 'React + Next.js starter with auth, roles, and data fetching.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
