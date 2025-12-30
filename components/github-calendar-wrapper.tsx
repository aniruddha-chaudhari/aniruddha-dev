"use client"

import { useEffect, useState, type ComponentProps } from "react"

type AnyComponent = React.ComponentType<any>

// Lazy-load the component on client side to avoid SSR issues and bundler interop problems
export function GitHubCalendar(props: Record<string, any>) {
    const [Component, setComponent] = useState<AnyComponent | null>(null)

    useEffect(() => {
        // Dynamic import at runtime, completely bypassing Next.js bundler magic
        import("react-github-calendar")
            .then((mod: any) => {
                // Handle both ESM default export and CJS module.exports patterns
                const CalendarComponent = mod.default || mod
                if (typeof CalendarComponent === 'function' || CalendarComponent?.$$typeof) {
                    setComponent(() => CalendarComponent)
                } else if (CalendarComponent?.default) {
                    // Some bundlers double-wrap the default
                    setComponent(() => CalendarComponent.default)
                } else {
                    console.error("Failed to load GitHubCalendar component", mod)
                }
            })
            .catch((err) => {
                console.error("Error loading react-github-calendar:", err)
            })
    }, [])

    if (!Component) {
        // Loading state
        return <div className="h-[160px] w-full rounded-lg bg-[color:var(--bg-800)]/40 animate-pulse" />
    }

    return <Component {...props} />
}
