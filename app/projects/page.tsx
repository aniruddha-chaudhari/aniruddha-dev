import type { Metadata } from "next"
import { ProjectsExplorer } from "@/components/projects-explorer"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { allProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Software Engineering Projects",
  description:
    "Explore full-stack, AI, Next.js, React, FastAPI, and creative web projects built by software engineer Aniruddha Chaudhari.",
  alternates: { canonical: "/projects" },
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
    <>
      <SiteHeader current="projects" />
      <main id="top">
        <ProjectsExplorer projects={allProjects()} />
      </main>
      <SiteFooter />
    </>
  )
}
