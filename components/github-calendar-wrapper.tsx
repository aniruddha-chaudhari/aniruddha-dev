"use client"

import { useEffect, useState } from "react"

type AnyComponent = React.ComponentType<any>

// Lazy-load react-github-calendar on client side to avoid SSR issues and bundler interop problems
export function GitHubCalendar(props: Record<string, any>) {
    const [Component, setComponent] = useState<AnyComponent | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        import("react-github-calendar")
            .then((mod: any) => {
                // Try to find the component in various places due to CJS/ESM interop differences
                let CalendarComponent: any = null

                if (typeof mod.default === 'function') {
                    CalendarComponent = mod.default
                } else if (mod.default && mod.default.$$typeof) {
                    CalendarComponent = mod.default
                } else if (typeof mod === 'function') {
                    CalendarComponent = mod
                } else if (mod.default && mod.default.default) {
                    CalendarComponent = mod.default.default
                } else if (mod.GitHubCalendar) {
                    CalendarComponent = mod.GitHubCalendar
                } else {
                    for (const key of Object.keys(mod)) {
                        const value = mod[key]
                        if (typeof value === 'function' || (value && value.$$typeof)) {
                            CalendarComponent = value
                            break
                        }
                    }
                }

                if (CalendarComponent) {
                    setComponent(() => CalendarComponent)
                } else {
                    setError("Failed to load calendar component")
                }
            })
            .catch(() => {
                setError("Error loading calendar")
            })
    }, [])

    if (error) {
        return <div className="h-[160px] w-full rounded-lg bg-red-900/20 flex items-center justify-center text-red-400 text-sm">{error}</div>
    }

    if (!Component) {
        return <div className="h-[160px] w-full rounded-lg bg-[color:var(--bg-800)]/40 animate-pulse" />
    }

    return <Component {...props} />
}
