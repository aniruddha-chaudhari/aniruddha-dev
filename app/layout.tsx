import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SITE } from "@/lib/site"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.name,
  description: SITE.role,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: SITE.name,
    description: SITE.role,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aniruddha Chaudhari, software engineer, beside an isometric drawing of a desk and monitor",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" }

// Runs before paint so a saved or system light theme doesn't flash dark first.
const THEME_SCRIPT = `try{var t=localStorage.getItem("iso-theme");document.body.dataset.theme=t||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="iso" data-theme="dark" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <div className="wrap">{children}</div>
      </body>
    </html>
  )
}
