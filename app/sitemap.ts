import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"
import { projectSlug } from "@/lib/project-slug"
import projectsData from "@/public/data/projects.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  const projectPages = projectsData.projects.map((project) => ({
    url: `${baseUrl}/projects/${projectSlug(project.title)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
    {
      url: `${baseUrl}/skill-tree`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ]
}
