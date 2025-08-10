import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const COOKIE_NAME = "mono_unique_visitor_v1"
// Use a stable namespace/key for your site
const NS = "aniruddha-portfolio"
const KEY = "unique-visitors"
// Public free counter service
const BASE = "https://api.countapi.xyz"

async function ensureCounter() {
  // Try to create the counter if it doesn't exist (ignore errors if it already exists)
  try {
    await fetch(`${BASE}/create?namespace=${encodeURIComponent(NS)}&key=${encodeURIComponent(KEY)}&value=0`)
  } catch {}
}

export async function GET() {
  const jar = cookies()
  const alreadyCounted = jar.get(COOKIE_NAME)

  try {
    let value = 0

    if (!alreadyCounted) {
      // Make sure the counter exists, then increment
      await ensureCounter()
      const res = await fetch(`${BASE}/hit/${encodeURIComponent(NS)}/${encodeURIComponent(KEY)}`)
      const data = await res.json().catch(() => ({}))
      value = typeof data?.value === "number" ? data.value : 0

      const json = NextResponse.json({ value }, { headers: { "Cache-Control": "no-store" } })
      // Count this browser as a unique visitor for ~1 year
      json.cookies.set(COOKIE_NAME, "1", { maxAge: 60 * 60 * 24 * 365, path: "/" })
      return json
    } else {
      // Just read current value without incrementing
      const res = await fetch(`${BASE}/get/${encodeURIComponent(NS)}/${encodeURIComponent(KEY)}`)
      const data = await res.json().catch(() => ({}))
      value = typeof data?.value === "number" ? data.value : 0
      return NextResponse.json({ value }, { headers: { "Cache-Control": "no-store" } })
    }
  } catch {
    // Fallback if the service is unreachable
    return NextResponse.json({ value: 0 }, { headers: { "Cache-Control": "no-store" } })
  }
}
