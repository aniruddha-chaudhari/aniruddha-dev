import type { Metadata } from "next"
import Link from "next/link"
import { ContribCard } from "@/components/contrib-card"
import { CopyEmailButton } from "@/components/copy-email-button"
import { DeskFigure } from "@/components/desk-figure"
import { GearsFigure } from "@/components/gears-figure"
import { ArrowIcon, GitHubIcon, LinkedInIcon } from "@/components/icons"
import { ProjectCards } from "@/components/project-cards"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getContributionGraph } from "@/lib/contributions"
import { featuredProjects } from "@/lib/projects"
import { ABOUT, SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  description:
    "Portfolio of Aniruddha Chaudhari, a software engineer building full-stack web applications with Next.js, React, FastAPI, AI, and modern cloud technologies.",
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.title,
    description:
      "Explore software engineering projects by Aniruddha Chaudhari built with Next.js, React, FastAPI, AI, and modern web technologies.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: "Software engineering portfolio featuring full-stack, AI, Next.js, React, and FastAPI projects.",
  },
}

export default async function HomePage() {
  const graph = await getContributionGraph(SITE.githubUser)

  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <div>
              <h1>{SITE.name}</h1>
              <p className="role">{SITE.role}</p>
              <p className="lede">{SITE.lede}</p>
            </div>
            <div className="actions">
              <a className="btn btn-solid" href="#projects">
                View projects
              </a>
              <a className="btn" href={SITE.cv} target="_blank" rel="noopener">
                Download CV
              </a>
            </div>
          </div>
          <DeskFigure />
          <ul className="socials" aria-label="Elsewhere">
            <li>
              <a href={SITE.github} target="_blank" rel="noopener">
                <GitHubIcon />
                GitHub
              </a>
            </li>
            <li>
              <a href={SITE.linkedin} target="_blank" rel="noopener">
                <LinkedInIcon />
                LinkedIn
              </a>
            </li>
            <li>
              <CopyEmailButton email={SITE.email} social />
            </li>
          </ul>
        </section>

        <section className="rows" id="about" aria-label="About">
          <div className="row">
            <h2>Currently</h2>
            <p>
              {ABOUT.currently.text}
              <a href={ABOUT.currently.link.href} target="_blank" rel="noopener">
                {ABOUT.currently.link.label}
              </a>
              {ABOUT.currently.after}
            </p>
          </div>
          <div className="row">
            <h2>Focus</h2>
            <p>{ABOUT.focus}</p>
          </div>
          <div className="row">
            <h2>Stack</h2>
            <p className="inline-list">
              {ABOUT.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
          </div>
        </section>

        <section className="block" id="projects">
          <div className="block-head">
            <h2>Selected projects</h2>
            <Link className="link" href="/projects">
              All projects <ArrowIcon />
            </Link>
          </div>
          <ProjectCards projects={featuredProjects()} />
        </section>

        <section className="block" id="github">
          <div className="block-head">
            <h2>GitHub activity</h2>
            <a className="link" href={SITE.github} target="_blank" rel="noopener">
              @{SITE.githubUser} <ArrowIcon />
            </a>
          </div>
          <ContribCard graph={graph} />
        </section>

        <section className="block contact" id="contact">
          <div className="contact-text">
            <div>
              <h2 className="contact-line">Have something to build? I&apos;m one email away.</h2>
              <p className="contact-note">Websites, web apps and AI features, from the first sketch to launch.</p>
            </div>
            <div>
              <div className="actions">
                <CopyEmailButton email={SITE.email} className="btn btn-solid" />
                <a className="btn" href={SITE.linkedin} target="_blank" rel="noopener">
                  LinkedIn <ArrowIcon />
                </a>
                <a className="btn" href={SITE.github} target="_blank" rel="noopener">
                  GitHub <ArrowIcon />
                </a>
              </div>
              <p className="email-plain">{SITE.email}</p>
            </div>
          </div>
          <GearsFigure />
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
