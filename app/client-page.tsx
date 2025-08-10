"use client"

import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Hero from "@/components/hero"
import SkillsChips from "@/components/skills-chips"
import FeaturedProjects from "@/components/featured-projects"
import GithubContrib from "@/components/github-contrib"
import DesignTokens from "@/components/design-tokens"
import Section from "@/components/section"
import SocialDock from "@/components/social-dock"
import ResizeObserverFix from "@/components/resizeobserver-fix"
import VisitorsCounter from "@/components/visitors-counter"
import { Github, Code2, Layers, ArrowRight } from "lucide-react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export default function ClientPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="mono-theme">
      <DesignTokens />
      <ResizeObserverFix />

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
        {/* Theme-aware texture overlay */}
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
            <Section id="home" className="pt-10 md:pt-16">
              <Hero />
            </Section>

            <Section id="skills" title="Skills" icon={<Code2 className="h-5 w-5" />}>
              <SkillsChips />
            </Section>

            <Section
              id="projects"
              title="Projects"
              icon={<Layers className="h-5 w-5" />}
              action={
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  aria-label="See all projects"
                >
                  See all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            >
              <FeaturedProjects />
            </Section>

            <Section id="github" title="GitHub" icon={<Github className="h-5 w-5" />}>
              <GithubContrib username="aniruddha-chaudhari" />
            </Section>
          </main>

          <VisitorsCounter />
          <SocialDock />
        </div>
      </div>
    </ThemeProvider>
  )
}
