"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeIcon } from "./icons"

type Theme = "light" | "dark"

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")

  // The inline script in the layout has already set body[data-theme]; pick that up.
  useEffect(() => {
    setTheme(document.body.dataset.theme === "light" ? "light" : "dark")
  }, [])

  const next: Theme = theme === "light" ? "dark" : "light"

  function toggle() {
    document.body.dataset.theme = next
    try {
      localStorage.setItem("iso-theme", next)
    } catch {}
    setTheme(next)
  }

  return (
    <button className="theme" type="button" onClick={toggle} aria-label={`Switch to ${next} mode`}>
      <ThemeIcon />
      <span className="theme-tip" aria-hidden="true">
        {next === "light" ? "Light mode" : "Dark mode"}
      </span>
    </button>
  )
}

export function SiteHeader({ current }: { current?: "projects" }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="top" data-scrolled={scrolled ? "" : undefined}>
      <Link className="brand" href="/#top" aria-label="Aniruddha Chaudhari, home">
        <span>aniruddha.dev</span>
      </Link>
      <nav>
        <Link href="/projects" aria-current={current === "projects" ? "page" : undefined}>
          Projects
        </Link>
        <Link href="/#about">About</Link>
        <Link href="/#github">GitHub</Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
