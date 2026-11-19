import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SITE } from "@/lib/site"
import { ScrollProgress } from "@/components/scroll-progress"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s | Aniruddha Chaudhari" },
  description: SITE.description,
  applicationName: "Aniruddha Chaudhari Portfolio",
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: SITE.keywords,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aniruddha Chaudhari, software engineer, beside an isometric drawing of a desk and monitor",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: ["/og.png"] },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" }

// Runs before paint so a saved or system light theme doesn't flash dark first.
const THEME_SCRIPT = `try{var t=localStorage.getItem("iso-theme");document.body.dataset.theme=t||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")}catch(e){}`

const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    jobTitle: "Software Engineer",
    description: SITE.description,
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Next.js",
      "React",
      "FastAPI",
      "Artificial Intelligence",
      "TypeScript",
    ],
    sameAs: [SITE.github, SITE.linkedin],
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="iso" data-theme="dark" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <ScrollProgress />
        <div className="wrap">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
