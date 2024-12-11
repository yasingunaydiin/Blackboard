import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blackboard',
  description: 'Blackboard by Yasin Gunaydin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Analytics />
        <meta
          name='google-site-verification'
          content='-9nXkAChkekC_pznMQROWam11ktW9DrG2Jg6bce4rgI'
        />
      </body>
    </html>
  );
}
