import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Doto } from 'next/font/google'
import ClientProviders from '@/components/client-providers'
import './globals.css'

const doto = Doto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-doto",
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
      </head>
      <body className={`${doto.variable}`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
