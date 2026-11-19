import Link from "next/link"
import { GitHubIcon, GlobeIcon } from "./icons"
import { projectSlug } from "@/lib/project-slug"
import { sentence, tagLabel, type Project } from "@/lib/projects"

/** The home page project grid: static cards, no hover effects. */
export function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <ul className="cards">
      {projects.map((p) => {
        const live = Boolean(p.live)
        return (
          <li key={p.id} className="card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="card-thumb" src={p.image} alt="" loading="lazy" />
            <div className="card-head">
              <Link className="card-name" href={`/projects/${projectSlug(p.title)}`}>
                {p.title}
              </Link>
              <span className="card-status" data-live={live}>
                <span className="dot" data-live={live} />
                {live ? "Live" : "Code only"}
              </span>
            </div>
            <p className="card-desc">{sentence(p.description)}</p>
            <div className="card-foot">
              <ul className="card-tags">
                {p.tags.slice(0, 3).map((t) => (
                  <li key={t}>{tagLabel(t)}</li>
                ))}
              </ul>
              <div className="card-links">
                {live && (
                  <a href={p.live} target="_blank" rel="noopener" aria-label={`${p.title} live site`}>
                    <GlobeIcon />
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener" aria-label={`${p.title} source code`}>
                    <GitHubIcon />
                  </a>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
