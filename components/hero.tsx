"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, Github } from "lucide-react"

export default function Hero() {
  return (
    <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 md:grid-cols-[240px_1fr] md:gap-10">
      <div className="flex justify-center md:justify-start">
        <div className="relative h-40 w-40 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.6)]">
          <Image
            src="https://github.com/aniruddha-chaudhari.png?size=240"
            alt="aniruddha chaudhari profile photo"
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="space-y-4 text-center md:text-left">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-widest text-[color:var(--muted)]">Software Engineer</p>
          <h1 className="text-4xl font-bold leading-tight text-[color:var(--fg)] sm:text-5xl">
            {"Aniruddha Chaudhari"}
          </h1>
          <p className="max-w-2xl text-[color:var(--muted)]">
            I craft performant, resilient interfaces with a focus on clean architecture, great UX, and maintainable
            code.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-start sm:gap-4">
          <Button
            asChild
            className="group bg-[color:var(--bg-700)] text-[color:var(--fg)] hover:bg-[color:var(--bg-700)]/80"
          >
            <a href="#projects" aria-label="View Projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/10 text-[color:var(--fg)] hover:bg-white/5 bg-transparent"
          >
            <a href="https://drive.google.com/file/d/1TkhQs73-b1tyvHTpDUAFnRaqfK2qZAQX/view?usp=drive_link" target="_blank" rel="noopener noreferrer" aria-label="Download CV (PDF)">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
          <Button asChild variant="ghost" className="text-[color:var(--fg)] hover:bg-white/5">
            <Link href="https://github.com/aniruddha-chaudhari" aria-label="View GitHub profile">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
