"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { projectSlug } from "@/lib/project-slug"
import { useEffect, useRef, useState } from "react"
import { ProjectList } from "./project-list"
import { rackSvg } from "./figures/rack-svg"
import type { Project } from "@/lib/projects"

/**
 * The /projects page body: a server rack drawing with one unit per project, linked to the list.
 * Hover a row and its unit slides out; hover a unit and its row highlights; click a unit to open the project.
 */
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(-1)
  const [from, setFrom] = useState<"list" | "rack">("list")
  const rack = useRef<HTMLElement>(null)
  const router = useRouter()

  useEffect(() => {
    const root = rack.current
    if (!root) return
    // a timer, not rAF, so a background tab still shows the units
    const ready = setTimeout(() => root.setAttribute("data-ready", ""), 80)
    const unitOf = (e: Event) => (e.target as Element).closest<SVGElement>("[data-unit]")
    const over = (e: Event) => {
      const u = unitOf(e)
      if (u) {
        setFrom("rack")
        setActive(Number(u.dataset.unit))
      }
    }
    const out = (e: Event) => {
      if (unitOf(e)) setActive(-1)
    }
    const click = (e: Event) => {
      const u = unitOf(e)
      const p = u && projects[Number(u.dataset.unit)]
      if (p) router.push(`/projects/${projectSlug(p.title)}`)
    }
    root.addEventListener("pointerover", over)
    root.addEventListener("pointerout", out)
    root.addEventListener("click", click)
    return () => {
      clearTimeout(ready)
      root.removeEventListener("pointerover", over)
      root.removeEventListener("pointerout", out)
      root.removeEventListener("click", click)
    }
  }, [projects, router])

  useEffect(() => {
    rack.current?.querySelectorAll<SVGElement>("[data-unit]").forEach((u) => {
      u.toggleAttribute("data-out", Number(u.dataset.unit) === active)
    })
  }, [active])

  return (
    <>
      <section className="page-head">
        <div>
          <Link className="back" href="/">
            ← Home
          </Link>
          <h1>Software engineering projects</h1>
          <p>
            Full-stack, AI, and interactive web projects built with technologies including Next.js, React, FastAPI, Gemini,
            Three.js, MongoDB, Qdrant, and Pinecone.
          </p>
        </div>
        <figure
          className="fig rack-fig"
          id="fig-rack"
          aria-hidden="true"
          ref={rack}
          dangerouslySetInnerHTML={{ __html: rackSvg }}
        />
      </section>
      <ProjectList
        projects={projects}
        all
        highlight={from === "rack" ? active : undefined}
        onPull={(i) => {
          setFrom("list")
          setActive(i)
        }}
      />
    </>
  )
}
