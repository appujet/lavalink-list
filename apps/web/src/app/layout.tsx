import Footer from '../components/layout/footer'
import './globals.css'
import cx from "classnames";
import type { Metadata, Viewport } from 'next'
import { sfPro, inter } from "./fonts/index";
import NavBar from '../components/layout/navbar';
import { Providers } from '../components/theme/providers';
import { Particle } from '../components/ui/Particle';


// Define your keywords
const keywords = [
  'lavalink', 'lavalink-client', 'lavalink-music', 'lavalink-musicbot',
  'lavalink-server', 'lavalink-discord', 'lavalink-hosting',
  'lavalink-node', 'free-lavalink', 'lavalink-status', 'free-lavalink-hosting'
];

export const metadata: Metadata = {
  title: {
    default: 'Lavalink List',
    template: '%s | Lavalink List',
  },
  description: 'A list of free and available public Lavalink nodes with their live status.',
  keywords: keywords.join(', '), // Combine keywords into a string
  twitter: {
    card: "summary_large_image",
    title: "Lavalink List",
    description: "A list of free and available public Lavalink nodes with their live status.",
    creator: "@blacky",
  },
  metadataBase: new URL("https://lavainfo.netlify.app/"),
}
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cx(sfPro.variable, inter.variable)}>
        <Providers>
          <div className="fixed h-screen w-full bg-background" />
          <Particle />
          <NavBar />
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
