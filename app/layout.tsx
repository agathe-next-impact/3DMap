import type { Metadata, Viewport } from 'next';
import { Open_Sans, Inter } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jeu de Piste - L'Hermitage et la Foret",
  description: "Explorez l'Hermitage et la foret de Laigue a travers un parcours de decouverte interactif.",
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', type: 'image/svg+xml', url: '/icons/logo.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/icons/logo.png' },
    { rel: 'apple-touch-icon', url: '/icons/logo.png' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Jeu de Piste',
  },
};

export const viewport: Viewport = {
  themeColor: '#2a4a51',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
