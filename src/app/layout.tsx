import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import { AuroraBackground } from '@/components/ui/aurora-background';

const metainfo = {
  name: 'Jakob Hoeg Mørk',
  description: 'Software developer from Denmark.',
  url: 'https://jakobhoeg.dev',
  icons: {
    icon: '/assets/logos/favicon-32x32.png',
  },
  image: 'https://jakobhoeg.dev/assets/metaimg.jpg',
};

export const metadata: Metadata = {
  metadataBase: new URL(metainfo.url),
  title: metainfo.name,
  description: metainfo.description,
  authors: {
    name: metainfo.name,
    url: metainfo.url,
  },
  creator: metainfo.name,
  openGraph: {
    type: 'website',
    title: metainfo.name,
    url: metainfo.url,
    description: metainfo.description,
    images: [metainfo.image],
    siteName: metainfo.name,
  },
  twitter: {
    card: 'summary_large_image',
    site: metainfo.url,
    creator: '@jakobhoeg',
    title: metainfo.name,
    description: metainfo.description,
    images: [metainfo.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <AuroraBackground>
          <ThemeProvider attribute="class" enableSystem defaultTheme="light">
            <div className="container flex h-[calc(100dvh)] max-w-3xl flex-col pt-8">
              <Navbar />
              <main className="flex flex-1 flex-col pb-20 pt-32 md:pt-40">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </AuroraBackground>
      </body>
    </html>
  );
}
