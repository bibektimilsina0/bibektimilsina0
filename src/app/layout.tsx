import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Bibek Timilsina | Full Stack Developer",
  description:
    "Bibek Timilsina is a Full Stack Web Developer from Nepal specializing in React.js, Next.js, Node.js, and MongoDB. Building modern, scalable web applications with cutting-edge technologies.",
  keywords: [
    "Bibek Timilsina",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Web Developer Nepal",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Nest.js",
    "Tailwind CSS",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Bibek Timilsina" }],
  creator: "Bibek Timilsina",
  publisher: "Bibek Timilsina",
  metadataBase: new URL("https://www.bibektimilsina.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bibek Timilsina | Full Stack Developer",
    description:
      "Explore the portfolio of Bibek Timilsina, a skilled full-stack developer from Nepal building modern web applications with React, Next.js, and Node.js.",
    url: "https://www.bibektimilsina.com.np",
    siteName: "Bibek Timilsina Portfolio",
    images: [
      {
        url: "/photo.jpg",
        width: 1200,
        height: 630,
        alt: "Bibek Timilsina - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bibek Timilsina | Full Stack Developer (MERN)",
    description:
      "Portfolio of Bibek Timilsina, a React/Next.js/Node.js developer from Nepal. Specializing in modern web development and scalable applications.",
    images: ["/photo.jpg"],
    creator: "@bibektimilsina",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
