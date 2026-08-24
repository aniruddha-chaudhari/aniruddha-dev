import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Doto } from 'next/font/google'
import ClientProviders from '@/components/client-providers'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getSiteUrl } from "@/lib/site-url"
import './globals.css'

const doto = Doto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-doto",
})

const siteDescription =
  "Aniruddha Chaudhari is a software engineer and full-stack developer building modern web applications with Next.js, React, FastAPI, AI, and cloud technologies."

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Aniruddha Chaudhari | Software Engineer & Full-Stack Developer",
    template: "%s | Aniruddha Chaudhari",
  },
  description: siteDescription,
  applicationName: "Aniruddha Chaudhari Portfolio",
  authors: [{ name: "Aniruddha Chaudhari", url: getSiteUrl() }],
  creator: "Aniruddha Chaudhari",
  publisher: "Aniruddha Chaudhari",
  keywords: [
    "Aniruddha Chaudhari",
    "software engineer",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "FastAPI developer",
    "AI developer",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Aniruddha Chaudhari | Software Engineer & Full-Stack Developer",
    description: siteDescription,
    siteName: "Aniruddha Chaudhari",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniruddha Chaudhari | Software Engineer & Full-Stack Developer",
    description: siteDescription,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: getSiteUrl(),
      name: "Aniruddha Chaudhari",
      description: siteDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Aniruddha Chaudhari",
      url: getSiteUrl(),
      jobTitle: "Software Engineer",
      description: siteDescription,
      knowsAbout: [
        "Software Engineering",
        "Full-Stack Development",
        "Next.js",
        "React",
        "FastAPI",
        "Artificial Intelligence",
        "TypeScript",
      ],
      sameAs: [
        "https://github.com/aniruddha-chaudhari",
      ],
    },
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-doto: ${doto.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${doto.variable}`}>
        <ClientProviders>
          {children}
          <Analytics />
          <SpeedInsights />
        </ClientProviders>
      </body>
    </html>
  )
}
