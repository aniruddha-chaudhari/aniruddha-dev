"use client"

import { useEffect, useMemo, useState } from "react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, Github, Tag } from "lucide-react"
import FeaturedCarousel from "@/components/featured-carousel"

type Project = {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  live?: string
  repo?: string
  featured?: boolean
}

export default function ProjectsGrid({ dataUrl = "/data/projects.json" }: { dataUrl?: string }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeTag, setActiveTag] = useState<string>("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch(dataUrl)
      .then((r) => r.json())
      .then((d) => {
        if (mounted) setProjects(d.projects as Project[])
      })
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [dataUrl])

  const tags = useMemo(() => {
    const t = new Set<string>()
    projects.forEach((p) => p.tags.forEach((tag) => t.add(tag)))
    return ["All", ...Array.from(t).sort()]
  }, [projects])

  const filtered = useMemo(() => {
    if (activeTag === "All") return projects
    return projects.filter((p) => p.tags.includes(activeTag))
  }, [projects, activeTag])

  const featured = projects.filter((p) => p.featured)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4">
      {featured.length > 0 && <FeaturedCarousel items={featured} />}

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
        {loading && <div className="col-span-full text-center text-[color:var(--muted)]">Loading projects…</div>}
        {!loading &&
          filtered.map((p) => (
            <article
              key={p.id}
              role="listitem"
              className="group rounded-2xl border border-white/10 bg-[color:var(--bg-800)]/60 text-[color:var(--fg)] shadow-[0_6px_30px_-12px_rgba(0,0,0,0.6)] transition-transform motion-safe:hover:-translate-y-0.5 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40"
            >
              <CardHeader className="space-y-3">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
                  <Image
                    src={p.image || "/placeholder.svg?height=360&width=640&query=monochrome%20project%20cover"}
                    alt={`${p.title} cover`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </div>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-[color:var(--muted)]">
                <p>{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="border border-white/10 bg-white/5 text-[color:var(--fg)]"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-2">
                {p.live && (
                  <Button
                    asChild
                    size="sm"
                    className="bg-[color:var(--bg-700)] text-[color:var(--fg)] hover:bg-[color:var(--bg-700)]/80"
                  >
                    <a href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.title} live site`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live
                    </a>
                  </Button>
                )}
                {p.repo && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-white/10 text-[color:var(--fg)] hover:bg-white/5 bg-transparent"
                  >
                    <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`Open ${p.title} repository`}>
                      <Github className="mr-2 h-4 w-4" />
                      Repo
                    </a>
                  </Button>
                )}
                <div className="ml-auto">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[color:var(--fg)] hover:bg-white/5"
                    onClick={() => window.open(p.live || p.repo || "#", "_blank")}
                    aria-label={`Open ${p.title}`}
                  >
                    View
                  </Button>
                </div>
              </CardFooter>
            </article>
          ))}
      </div>
    </div>
  )
}
