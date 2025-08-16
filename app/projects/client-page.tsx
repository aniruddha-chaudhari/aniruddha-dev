"use client"

import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import DesignTokens from "@/components/design-tokens"
import Header from "@/components/header"
import Section from "@/components/section"
import ProjectsGrid from "@/components/projects-grid"
import SocialDock from "@/components/social-dock"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import VisitorsCounter from "@/components/visitors-counter"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export default function ProjectsClientPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="mono-theme">
      <DesignTokens />

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 rounded-md bg-[var(--bg-700)] px-3 py-2 text-[var(--fg)] shadow focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      >
        Skip to content
      </a>

      <div
        className="min-h-dvh"
        style={{ background: "linear-gradient(135deg, var(--grad-from) 0%, var(--grad-to) 100%)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage: "var(--texture)",
            backgroundRepeat: "var(--texture-repeat)",
            backgroundSize: "var(--texture-size)",
            backgroundPosition: "var(--texture-position)",
            opacity: "var(--texture-opacity)",
          }}
        />

        <div className={`${inter.className} relative`}>
          <Header />
          <main id="content" className="relative">
            <div className="mx-auto w-full max-w-6xl px-4 pt-6">
              <Link
                href="/"
                aria-label="Back to home"
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>

            <Section id="projects" title="All Projects" usePixelFont={true}>
              <ProjectsGrid />
            </Section>
          </main>

          <VisitorsCounter />
          <SocialDock />
        </div>
      </div>
    </ThemeProvider>
  )
}
