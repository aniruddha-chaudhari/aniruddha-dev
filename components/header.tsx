"use client"

import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import { Rocket } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[color:var(--bg-800)]/60 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg-800)]/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="#home"
          className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[var(--fg)] ring-1 ring-white/10">
            <Rocket className="h-4 w-4 transition-transform group-hover:rotate-12 motion-reduce:transition-none" />
          </div>
          <span className="font-medium tracking-tight text-[color:var(--fg)]">Your Name</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-[color:var(--muted)] sm:flex">
          <a
            href="#skills"
            className="hover:text-[color:var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="hover:text-[color:var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Projects
          </a>
          <a
            href="#github"
            className="hover:text-[color:var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
