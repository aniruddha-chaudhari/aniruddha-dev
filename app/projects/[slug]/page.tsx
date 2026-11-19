import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowIcon } from "@/components/icons"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { projectSlug } from "@/lib/project-slug"
import { allProjects, sentence, tagLabel } from "@/lib/projects"
import { SITE } from "@/lib/site"

type Params = { slug: string }

const find = (slug: string) => allProjects().find((p) => projectSlug(p.title) === slug)

export function generateStaticParams() {
  return allProjects().map((p) => ({ slug: projectSlug(p.title) }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = find((await params).slug)
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } }

  const slug = projectSlug(project.title)
  const stack = project.tags.slice(0, 4).map(tagLabel).join(", ")
  const description = project.description || `${project.title}, a software project built with ${stack} by Aniruddha Chaudhari.`
  const image = project.image ? [{ url: project.image, alt: `${project.title} project preview` }] : undefined

  return {
    title: `${project.title} – ${stack}`,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} | Aniruddha Chaudhari`,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aniruddha Chaudhari`,
      description,
      images: project.image ? [project.image] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = find(slug)
  if (!project) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url: `${SITE.url}/projects/${slug}`,
    codeRepository: project.repo || undefined,
    programmingLanguage: project.tags,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
  }

  return (
    <>
      <SiteHeader current="projects" />
      <main id="top">
        <article className="detail">
          <Link className="back" href="/projects">
            ← All projects
          </Link>
          <h1>{project.title}</h1>
          <p className="detail-lede">{sentence(project.description)}</p>
          <p className="inline-list">
            {project.tags.map((t) => (
              <span key={t}>{tagLabel(t)}</span>
            ))}
          </p>

          {project.image && (
            <figure className="fig detail-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={`${project.title} project screenshot`} />
            </figure>
          )}

          <div className="actions">
            {project.live && (
              <a className="btn btn-solid" href={project.live} target="_blank" rel="noopener">
                Live project <ArrowIcon />
              </a>
            )}
            {project.repo && (
              <a className="btn" href={project.repo} target="_blank" rel="noopener">
                GitHub repository <ArrowIcon />
              </a>
            )}
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
