import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "octocat"

  try {
    // Public, unauthenticated. Rate-limited by GitHub. Cache results.
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { "User-Agent": "v0-portfolio" },
      next: { revalidate: 60 * 60 * 24 }, // ISR-like caching (24h)
    })

    if (!res.ok) {
      return NextResponse.json({ totalStars: 0, totalForks: 0, publicRepos: 0 }, { status: res.status })
    }

    const repos: any[] = await res.json()
    const totals = repos.reduce(
      (acc, r) => {
        acc.stars += r.stargazers_count || 0
        acc.forks += r.forks_count || 0
        return acc
      },
      { stars: 0, forks: 0 },
    )

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { "User-Agent": "v0-portfolio" },
      next: { revalidate: 60 * 60 * 24 },
    })
    const userData: any = userRes.ok ? await userRes.json() : {}
    const payload = {
      totalStars: totals.stars,
      totalForks: totals.forks,
      publicRepos: userData.public_repos ?? repos.length,
    }

    const json = NextResponse.json(payload)
    json.headers.set("Cache-Control", "s-maxage=86400, stale-while-revalidate=43200")
    return json
  } catch {
    return NextResponse.json({ totalStars: 0, totalForks: 0, publicRepos: 0 }, { status: 500 })
  }
}
