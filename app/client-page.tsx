"use client"

import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Hero from "@/components/hero"
import SkillsGrid from "@/components/skills-grid"
import ProjectsGrid from "@/components/projects-grid"
import GithubContrib from "@/components/github-contrib"
import DesignTokens from "@/components/design-tokens"
import Section from "@/components/section"
import { Github, Code2, Layers } from "lucide-react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function ClientPage() {
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
        style={{
          background: "linear-gradient(135deg, var(--grad-from) 0%, var(--grad-to) 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "url('/images/noise.png')",
            backgroundRepeat: "repeat",
          }}
        />

        <div className={`${inter.className} relative`}>
          <Header />

          <main id="content" className="relative">
            <Section id="home" className="pt-10 md:pt-16">
              <Hero />
            </Section>

            <Section id="skills" title="Skills" icon={<Code2 className="h-5 w-5" />}>
              <SkillsGrid />
            </Section>

            <Section id="projects" title="Projects" icon={<Layers className="h-5 w-5" />}>
              <ProjectsGrid />
            </Section>

            <Section id="github" title="GitHub" icon={<Github className="h-5 w-5" />}>
              <GithubContrib username="octocat" />
            </Section>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
