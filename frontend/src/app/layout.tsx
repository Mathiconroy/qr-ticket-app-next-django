import '@/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Ticketify</title>
      </head>
      <body className={`${inter.className} bg-neutral-100`}>{children}</body>
    </html>
  );
}
