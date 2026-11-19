import { SITE } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="foot">
      <span>
        © {new Date().getFullYear()} {SITE.name}
      </span>
      <span>Built with Next.js</span>
    </footer>
  )
}
