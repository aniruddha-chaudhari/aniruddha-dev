"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Item = {
  id: string
  title: string
  image?: string
  live?: string
  repo?: string
}

export default function FeaturedCarousel({ items = [] as Item[] }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-tight text-[color:var(--muted)]">Featured</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Scroll previous"
            className="h-8 w-8 border-white/10 text-[color:var(--fg)] hover:bg-white/5 bg-transparent"
            onClick={() => ref.current?.scrollBy({ left: -360, behavior: "smooth" })}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Scroll next"
            className="h-8 w-8 border-white/10 text-[color:var(--fg)] hover:bg-white/5 bg-transparent"
            onClick={() => ref.current?.scrollBy({ left: 360, behavior: "smooth" })}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-xl p-1 [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" as any }}
      >
        {items.map((it) => (
          <a
            key={it.id}
            href={it.live || it.repo || "#"}
            target="_blank"
            rel="noreferrer"
            className="group inline-block w-[260px] shrink-0 snap-start rounded-xl border border-white/10 bg-white/5 ring-0 hover:ring-1 hover:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={`Open featured project ${it.title}`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
              <Image
                src={it.image || "/placeholder.svg?height=240&width=400&query=featured%20project%20cover%20monochrome"}
                alt={`${it.title} cover`}
                fill
                sizes="260px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </div>
            <div className="p-3 text-sm text-[color:var(--fg)]">{it.title}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
