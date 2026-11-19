import type { MetadataRoute } from "next"
import { allProjects } from "@/lib/projects"
import { projectSlug } from "@/lib/project-slug"
import { SITE } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...allProjects().map((p) => ({
      url: `${SITE.url}/projects/${projectSlug(p.title)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
