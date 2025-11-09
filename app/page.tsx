import { Inter } from "next/font/google"
import Header from "@/components/header"
import HeroServer from "@/components/hero-server"
import SkillsChipsServer from "@/components/skills-chips-server"
import FeaturedProjectsServer from "@/components/featured-projects-server"
import GithubContrib from "@/components/github-contrib"
import Section from "@/components/section"
import SocialDock from "@/components/social-dock"
import VisitorsCounter from "@/components/visitors-counter"
import { Github, Code2, Layers, ArrowRight } from "lucide-react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "Aniruddha Portfolio",
  description:
    "A calm, professional, minimal personal portfolio. Monochrome, responsive, accessible, with projects and GitHub activity.",
  openGraph: {
    title: "Aniruddha Portfolio",
    description:
      "A calm, professional, minimal personal portfolio. Monochrome, responsive, accessible, with projects and GitHub activity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniruddha Portfolio",
    description:
      "A calm, professional, minimal personal portfolio. Monochrome, responsive, accessible, with projects and GitHub activity.",
  },
}

export default function Page() {
  return (
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
              <HeroServer />
            </Section>

            <Section id="skills" title="Skills" icon={<Code2 className="h-5 w-5" />} usePixelFont={true}>
              <SkillsChipsServer />
            </Section>

            <Section
              id="projects"
              title="Projects"
              icon={<Layers className="h-5 w-5" />}
              usePixelFont={true}
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
              <FeaturedProjectsServer />
            </Section>

            <Section id="github" title="GitHub" icon={<Github className="h-5 w-5" />} usePixelFont={true}>
              <GithubContrib username="aniruddha-chaudhari" />
            </Section>
          </main>

          <VisitorsCounter />
          <SocialDock />
        </div>
      </div>
  )
}
