"use client"

import { useEffect, useState } from "react"

type AnyComponent = React.ComponentType<any>

// Lazy-load the component on client side to avoid SSR issues and bundler interop problems
export function GitHubCalendar(props: Record<string, any>) {
    const [Component, setComponent] = useState<AnyComponent | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Dynamic import at runtime, completely bypassing Next.js bundler magic
        import("react-github-calendar")
            .then((mod: any) => {
                console.log("[DEBUG] GitHubCalendar: Module loaded:", mod)
                console.log("[DEBUG] GitHubCalendar: Module keys:", Object.keys(mod))
                console.log("[DEBUG] GitHubCalendar: mod.default:", mod.default)
                console.log("[DEBUG] GitHubCalendar: typeof mod.default:", typeof mod.default)

                // Try to find the component in various places
                let CalendarComponent: any = null

                // Check if default is a function (ESM default export)
                if (typeof mod.default === 'function') {
                    CalendarComponent = mod.default
                    console.log("[DEBUG] Found as mod.default (function)")
                }
                // Check if default is a React element type (forwardRef, memo, etc.)
                else if (mod.default && mod.default.$$typeof) {
                    CalendarComponent = mod.default
                    console.log("[DEBUG] Found as mod.default (React element type)")
                }
                // Check if module itself is callable (CJS)
                else if (typeof mod === 'function') {
                    CalendarComponent = mod
                    console.log("[DEBUG] Found as mod (function)")
                }
                // Check for double-wrapped default
                else if (mod.default && mod.default.default) {
                    CalendarComponent = mod.default.default
                    console.log("[DEBUG] Found as mod.default.default")
                }
                // Check for named export GitHubCalendar
                else if (mod.GitHubCalendar) {
                    CalendarComponent = mod.GitHubCalendar
                    console.log("[DEBUG] Found as mod.GitHubCalendar")
                }
                // Last resort: find any React component in the module exports
                else {
                    for (const key of Object.keys(mod)) {
                        const value = mod[key]
                        if (typeof value === 'function' || (value && value.$$typeof)) {
                            CalendarComponent = value
                            console.log("[DEBUG] Found component at key:", key)
                            break
                        }
                    }
                }

                if (CalendarComponent) {
                    setComponent(() => CalendarComponent)
                } else {
                    console.error("[DEBUG] Failed to find GitHubCalendar component in module:", mod)
                    setError("Failed to load calendar component")
                }
            })
            .catch((err) => {
                console.error("Error loading react-github-calendar:", err)
                setError("Error loading calendar")
            })
    }, [])

    if (error) {
        return <div className="h-[160px] w-full rounded-lg bg-red-900/20 flex items-center justify-center text-red-400 text-sm">{error}</div>
    }

    if (!Component) {
        // Loading state
        return <div className="h-[160px] w-full rounded-lg bg-[color:var(--bg-800)]/40 animate-pulse" />
    }

    return <Component {...props} />
}
