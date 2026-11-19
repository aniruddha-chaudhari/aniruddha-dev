import type { Metadata } from "next"
import { ProjectsExplorer } from "@/components/projects-explorer"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { allProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects · Aniruddha Chaudhari",
  description: "Everything I've built and shipped, from a hackathon arcade to retrieval agents.",
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
