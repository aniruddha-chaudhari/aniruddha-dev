import type React from "react"

export default function Section({
  id,
  title,
  icon,
  children,
  className = "",
}: {
  id?: string
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`py-10 md:py-16 scroll-mt-24 md:scroll-mt-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4">
        {title ? (
          <div className="mb-6 flex items-center gap-3">
            {icon ? <div className="text-[color:var(--muted)]">{icon}</div> : null}
            <h2 className="text-xl font-semibold tracking-tight text-[color:var(--fg)] sm:text-2xl">{title}</h2>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}
