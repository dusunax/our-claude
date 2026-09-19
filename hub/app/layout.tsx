import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata = { title: 'Our Claude Hub' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="top">
          <Link href="/">Our Claude Hub</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
