import { Inter } from "next/font/google"
import Header from "@/components/header"
import Section from "@/components/section"
import ProjectsGridServer from "@/components/projects-grid-server"
import SocialDock from "@/components/social-dock"
import VisitorsCounter from "@/components/visitors-counter"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "All Projects • Monochrome Portfolio",
  description: "Browse all projects with filters and tags.",
}

// Force static generation
export const dynamic = 'force-static'
export const revalidate = false

export default function ProjectsPage() {
  return (
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
            <ProjectsGridServer />
          </Section>
        </main>

        <VisitorsCounter />
        <SocialDock />
      </div>
    </div>
  )
}
