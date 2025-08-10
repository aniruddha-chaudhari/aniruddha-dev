import type React from "react"

interface SectionProps {
  id?: string
  title?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export default function Section({ id, title, icon, action, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-10 md:py-16 scroll-mt-24 md:scroll-mt-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4">
        {title ? (
          <div className="mb-6 flex items-center gap-3">
            {icon ? <div className="text-[color:var(--muted)]">{icon}</div> : null}
            <h2 className="text-xl font-semibold tracking-tight text-[color:var(--fg)] sm:text-2xl">{title}</h2>
            {action ? <div className="ml-auto">{action}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}
