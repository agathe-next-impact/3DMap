import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Jeu de Piste - L'Hermitage et la Foret",
  description: "Explorez l'Hermitage et la foret de Laigue a travers un parcours de decouverte interactif.",
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', type: 'image/svg+xml', url: '/icons/icon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/icons/icon-192.png' },
    { rel: 'apple-touch-icon', url: '/icons/icon-192.png' },
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
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
