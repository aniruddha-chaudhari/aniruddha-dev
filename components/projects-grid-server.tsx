import { promises as fs } from "fs"
import path from "path"
import ProjectsGridClient from "@/components/projects-grid-client"
import { type Project } from "@/components/project-card"

interface ProjectsData {
  projects: Project[]
}

async function getAllProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "projects.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data: ProjectsData = JSON.parse(fileContents)
    return data.projects
  } catch (error) {
    console.error("Error loading projects:", error)
    return []
  }
}

export default async function ProjectsGridServer() {
  const projects = await getAllProjects()
  return <ProjectsGridClient initialProjects={projects} />
}
