"use client"

import { useEffect, useState } from "react"

interface VisitorResponse {
  value: number
  isNew?: boolean
  error?: string
}

export default function VisitorsCounter({ className = "" }: { className?: string }) {
  const [value, setValue] = useState<number | null>(null)
  const [isNew, setIsNew] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    
    const fetchVisitors = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch("/api/visitors", { 
          cache: "no-store",
          credentials: 'include' // Important for cookies
        })
        
        if (!mounted) return
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: VisitorResponse = await response.json()
        
        if (mounted) {
          if (data.error) {
            setError(data.error)
            setValue(0)
          } else {
            setValue(data.value)
            setIsNew(data.isNew || false)
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch visitor count')
          setValue(0)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchVisitors()
    
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className={`w-full max-w-6xl px-4 pb-12 pt-6 ${className}`}>
      <p className="text-left text-sm text-[color:var(--muted)]">
        People visited:{" "}
        {loading ? (
          <span className="font-medium text-[color:var(--fg)]">Loading...</span>
        ) : error ? (
          <span className="font-medium text-red-500">Error loading count</span>
        ) 
        : (
          <span className="font-medium text-[color:var(--fg)]">
            {value?.toLocaleString() ?? "—"}
          </span>
        )}
      </p>
    </div>
  )
}
