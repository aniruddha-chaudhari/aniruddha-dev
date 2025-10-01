"use client"

import { useEffect, useState } from "react"
import ProjectCard, { type Project } from "@/components/project-card"

export default function FeaturedProjects({ dataUrl = "/data/projects.json" }: { dataUrl?: string }) {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch(dataUrl)
      .then((r) => r.json())
      .then((d) => {
        const featured = (d.projects as Project[]).filter((p) => p.featured).slice(0, 3)
        if (mounted) setItems(featured)
      })
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [dataUrl])

  if (loading) return <div className="text-[color:var(--muted)]">Loading featured projects…</div>
  if (!items.length) return <div className="text-[color:var(--muted)]">No featured projects yet.</div>

  return (
    <div role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
