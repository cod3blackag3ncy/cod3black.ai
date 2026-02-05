import './globals.css';
import PWAInstall from './pwa-install';

export const metadata = {
  charset: 'utf-8',
  title: 'Cod3Black - Production Systems: Web, AI, Apps, Software',
  description: 'We build production systems. Not marketing platforms. Not toy demos. Custom web, AI automation, mobile apps, SaaS platforms. Real latency. Real costs. Real reliability. $125/hour transparent pricing.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Cod3Black',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'mask-icon', url: '/icon-maskable.png' }
    ]
  },
  openGraph: {
    title: 'Cod3Black - Production Systems: Web, AI, Apps, Software',
    description: 'We build production systems. Not marketing platforms. Not toy demos. Custom web, AI automation, mobile apps, SaaS platforms. Real latency. Real costs. Real reliability. $125/hour transparent pricing.',
    url: 'https://c3bai.vercel.app',
    siteName: 'Cod3Black Agency',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cod3Black Agency - Production Systems'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cod3Black - Production Systems: Web, AI, Apps, Software',
    description: 'We build production systems. Not marketing platforms. Not toy demos. Custom web, AI automation, mobile apps, SaaS platforms. Real latency. Real costs. Real reliability. $125/hour transparent pricing.',
    images: ['/twitter-card.png']
  },
  metadataBase: new URL('https://c3bai.vercel.app')
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Cod3Black" />
        <meta name="description" content="Custom web design, mobile apps, and software development. $125/hour transparent pricing." />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body>
        <PWAInstall />
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
