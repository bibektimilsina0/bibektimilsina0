import { Inter } from 'next/font/google';
import './globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Navbar from './components/navbar';
import Footer from './components/footer';
import { ToastProvider } from "@/app/components/ui/use_toast";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bibek Timilsina | Full Stack Developer',
  description: 'Bibek Timilsina is a Full Stack Web Developer from Nepal specializing in React.js, Next.js, Node.js, and MongoDB.',
  keywords: [
    'Bibek Timilsina',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Web Developer Nepal',
    'Portfolio',
    'JavaScript',
    'Node.js',
    'MongoDB'
  ],
  authors: [{ name: 'Bibek Timilsina' }],
  creator: 'Bibek Timilsina',
  metadataBase: new URL('https://www.bibektimilsina.com.np'),
  openGraph: {
    title: 'Bibek Timilsina | Full Stack Developer',
    description: 'Explore the portfolio of Bibek Timilsina, a skilled full-stack developer from Nepal building modern web apps.',
    url: 'https://www.bibektimilsina.com.np', 
    siteName: 'Bibek Timilsina',
    images: [
      {
        url: '/photo.jpg', // ideally should be 1200x630
        width: 1200,
        height: 630,
        alt: 'Bibek Timilsina Portfolio Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bibek Timilsina | Full Stack Developer(MERN)',
    description: 'Portfolio of Bibek Timilsina, a React/Next.js/Node.js developer from Nepal.',
    images: ['/photo.jpg'],
  },
 icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ToastProvider>{children}</ToastProvider>
        <Footer />
      </body>
    </html>
  );
}
