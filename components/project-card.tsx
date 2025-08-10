"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export type Project = {
  id: string
  title: string
  description?: string
  image?: string
  tags: string[]
  live?: string
  repo?: string
  featured?: boolean
}

export default function ProjectCard({ project }: { project: Project }) {
  const { title, description, image, tags, live, repo } = project

  return (
    <article
      className="group rounded-2xl border border-white/10 bg-[color:var(--bg-800)]/60 text-[color:var(--fg)] shadow-[0_6px_30px_-12px_rgba(0,0,0,0.6)] transition-transform motion-safe:hover:-translate-y-0.5 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40 focus-within:ring-2 focus-within:ring-[var(--accent)]"
      role="listitem"
    >
      <div className="flex h-full flex-col p-3">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
          <Image
            src={image || "/placeholder.svg?height=360&width=640&query=monochrome%20project%20cover"}
            alt={`${title} cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>

        <div className="flex-1 space-y-3 pt-3">
          <div className="px-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description ? <p className="mt-1 text-sm text-[color:var(--muted)]">{description}</p> : null}
          </div>

          <div className="flex flex-wrap gap-2 px-1">
            {tags?.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="border border-white/10 bg-white/5 text-[color:var(--fg)]"
                aria-label={`Tech: ${t}`}
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-1 pb-1 pt-2">
          {live ? (
            <Button
              asChild
              size="sm"
              className="bg-[color:var(--bg-700)] text-[color:var(--fg)] hover:bg-[color:var(--bg-700)]/80"
            >
              <a href={live} target="_blank" rel="noreferrer" aria-label={`Open ${title} live site`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Live
              </a>
            </Button>
          ) : null}
          {repo ? (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/10 text-[color:var(--fg)] hover:bg-white/5 bg-transparent"
            >
              <a href={repo} target="_blank" rel="noreferrer" aria-label={`Open ${title} repository on GitHub`}>
                <Github className="mr-2 h-4 w-4" />
                Repo
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
