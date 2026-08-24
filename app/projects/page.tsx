import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Section from "@/components/section"
import ProjectsGridServer from "@/components/projects-grid-server"
import SocialDock from "@/components/social-dock"
import VisitorsCounter from "@/components/visitors-counter"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Software Engineering Projects",
  description:
    "Explore full-stack, AI, Next.js, React, FastAPI, and creative web projects built by software engineer Aniruddha Chaudhari.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Software Engineering Projects | Aniruddha Chaudhari",
    description:
      "A collection of full-stack, AI, Next.js, React, FastAPI, and interactive web projects by Aniruddha Chaudhari.",
    url: "/projects",
    type: "website",
  },
}

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

          <Section id="projects" title="Software Engineering Projects" usePixelFont={true}>
            <div className="mx-auto mb-6 w-full max-w-6xl px-4">
              <p className="max-w-3xl text-sm leading-6 text-[color:var(--muted)] md:text-base">
                Full-stack, AI, and interactive web projects built with technologies including Next.js, React,
                FastAPI, Gemini, Three.js, MongoDB, Qdrant, and Pinecone.
              </p>
            </div>
            <ProjectsGridServer />
          </Section>
        </main>

        <VisitorsCounter />
        <SocialDock />
      </div>
    </div>
  )
}
