"use client"

import { useMemo, useState } from "react"
import ProjectCard, { type Project } from "@/components/project-card"
import { Tag } from "lucide-react"

interface ProjectsGridClientProps {
  initialProjects: Project[]
}

export default function ProjectsGridClient({ initialProjects }: ProjectsGridClientProps) {
  const [activeTag, setActiveTag] = useState<string>("All")

  // Build filters
  const tags = useMemo(() => {
    const t = new Set<string>()
    initialProjects.forEach((p) => p.tags?.forEach((tag) => t.add(tag)))
    return ["All", ...Array.from(t).sort()]
  }, [initialProjects])

  const filtered = useMemo(() => {
    if (activeTag === "All") return initialProjects
    return initialProjects.filter((p) => p.tags?.includes(activeTag))
  }, [initialProjects, activeTag])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)]">
          <Tag className="h-4 w-4" />
          Filter by tech:
        </span>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`rounded-full border px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              activeTag === t
                ? "border-white/20 bg-white/10 text-[color:var(--fg)]"
                : "border-white/10 bg-white/5 text-[color:var(--muted)] hover:text-[color:var(--fg)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
