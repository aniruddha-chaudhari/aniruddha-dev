import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Section from "@/components/section"
import SocialDock from "@/components/social-dock"
import VisitorsCounter from "@/components/visitors-counter"
import Link from "next/link"
import { ArrowLeft, TreeDeciduous } from "lucide-react"
import SkillTreeClient from "./skill-tree-client"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Developer Skills & Technology Stack",
  description:
    "Explore Aniruddha Chaudhari's software engineering skill tree across Next.js, React, backend development, AI, databases, and modern web technologies.",
  alternates: {
    canonical: "/skill-tree",
  },
  openGraph: {
    title: "Developer Skills & Technology Stack | Aniruddha Chaudhari",
    description:
      "Aniruddha Chaudhari's software engineering skills across frontend, backend, AI, databases, and modern web development.",
    url: "/skill-tree",
    type: "website",
  },
}

export default function SkillTreePage() {
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

          <Section 
            id="skill-tree" 
            title="Skill Tree" 
            icon={<TreeDeciduous className="h-5 w-5" />}
            usePixelFont={true}
            className="py-4 md:py-6"
          >
            <SkillTreeClient />
          </Section>
        </main>

        <VisitorsCounter />
        <SocialDock />
      </div>
    </div>
  )
}
