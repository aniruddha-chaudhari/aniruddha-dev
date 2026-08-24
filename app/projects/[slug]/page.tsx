import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import Header from "@/components/header"
import SocialDock from "@/components/social-dock"
import VisitorsCounter from "@/components/visitors-counter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projectSlug } from "@/lib/project-slug"
import { getSiteUrl } from "@/lib/site-url"
import projectsData from "@/public/data/projects.json"

type Project = {
  id: string
  title: string
  description?: string
  image?: string
  tags: string[]
  live?: string
  repo?: string
  featured?: boolean
}

const projects = projectsData.projects as Project[]

function getProject(slug: string) {
  return projects.find((project) => projectSlug(project.title) === slug)
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: projectSlug(project.title),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    }
  }

  const stack = project.tags.slice(0, 4).join(", ")
  const description =
    project.description || `${project.title}, a software project built with ${stack} by Aniruddha Chaudhari.`

  return {
    title: `${project.title} – ${stack}`,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Aniruddha Chaudhari`,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: project.image ? [{ url: project.image, alt: `${project.title} project preview` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aniruddha Chaudhari`,
      description,
      images: project.image ? [project.image] : undefined,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  const projectUrl = `${getSiteUrl()}/projects/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url: projectUrl,
    codeRepository: project.repo || undefined,
    programmingLanguage: project.tags,
    author: {
      "@type": "Person",
      name: "Aniruddha Chaudhari",
      url: getSiteUrl(),
    },
  }

  return (
    <div
      className="min-h-dvh"
      style={{ background: "linear-gradient(135deg, var(--grad-from) 0%, var(--grad-to) 100%)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "var(--texture)",
          backgroundRepeat: "var(--texture-repeat)",
          backgroundSize: "var(--texture-size)",
          backgroundPosition: "var(--texture-position)",
          opacity: "var(--texture-opacity)",
        }}
      />

      <div className="relative">
        <Header />
        <main id="content" className="relative mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>

          <article className="space-y-8">
            <header className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-[color:var(--muted)]">Software Project</p>
              <h1 className="text-4xl font-bold leading-tight text-[color:var(--fg)] sm:text-5xl">
                {project.title}
              </h1>
              {project.description ? (
                <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)] md:text-lg">
                  {project.description}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="border border-white/10 bg-white/5 text-[color:var(--fg)]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {project.image ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--bg-800)]/60">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <section className="space-y-3 rounded-2xl border border-white/10 bg-[color:var(--bg-800)]/50 p-5 md:p-6">
              <h2 className="text-2xl font-semibold text-[color:var(--fg)]">Project overview</h2>
              <p className="max-w-3xl leading-7 text-[color:var(--muted)]">
                {project.description || `${project.title} is a software project by Aniruddha Chaudhari.`}
              </p>
              <p className="max-w-3xl leading-7 text-[color:var(--muted)]">
                The project is built with {project.tags.join(", ")}.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[color:var(--fg)]">Links</h2>
              <div className="flex flex-wrap gap-3">
                {project.live ? (
                  <Button asChild>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live project
                    </a>
                  </Button>
                ) : null}
                {project.repo ? (
                  <Button asChild variant="outline">
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub repository
                    </a>
                  </Button>
                ) : null}
              </div>
            </section>
          </article>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </main>

        <VisitorsCounter />
        <SocialDock />
      </div>
    </div>
  )
}
