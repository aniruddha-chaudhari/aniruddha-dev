import { promises as fs } from "fs"
import path from "path"
import ProjectCard, { type Project } from "@/components/project-card"

interface ProjectsData {
  projects: Project[]
}

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "projects.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data: ProjectsData = JSON.parse(fileContents)
    return data.projects.filter((p) => p.featured).slice(0, 3)
  } catch (error) {
    console.error("Error loading featured projects:", error)
    return []
  }
}

export default async function FeaturedProjectsServer() {
  const projects = await getFeaturedProjects()

  if (!projects.length) {
    return <div className="text-[color:var(--muted)]">No featured projects yet.</div>
  }

  return (
    <div role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
