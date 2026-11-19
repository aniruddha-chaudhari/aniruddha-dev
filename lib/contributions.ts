import raw from "@/data/contributions.json"

export type Day = { date: string; count: number; level: number }
export type Cell = { col: number; row: number; count: number; level: number; label: string }
export type ContributionGraph = {
  cells: Cell[]
  cols: number
  total: number
  active: number
  streak: number
  busiest: { label: string; count: number }
  months: { col: number; name: string }[]
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

/** Lay a year of days onto the weekday grid GitHub uses (weeks across, Sunday at the top). */
export function layoutContributions(days: Day[]): ContributionGraph {
  const dated = days.map((d) => ({ ...d, dt: new Date(d.date + "T00:00:00Z") }))
  const startDow = dated[0].dt.getUTCDay()
  const label = (dt: Date) => `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}`
  const cells: Cell[] = dated.map((d, i) => ({
    col: Math.floor((i + startDow) / 7),
    row: (i + startDow) % 7,
    count: d.count,
    level: d.level,
    label: label(d.dt),
  }))
  const cols = cells[cells.length - 1].col + 1

  let streak = 0
  for (let run = 0, i = 0; i < dated.length; i++) {
    run = dated[i].count ? run + 1 : 0
    streak = Math.max(streak, run)
  }
  const busiest = cells.reduce((a, b) => (b.count > a.count ? b : a))

  const months: ContributionGraph["months"] = []
  let last = -1
  for (let c = 0; c < cols - 2; c++) {
    const d = dated.find((_, i) => cells[i].col === c)!
    const m = d.dt.getUTCMonth()
    if (m !== last) {
      months.push({ col: c, name: MONTHS[m] })
      last = m
    }
  }

  return {
    cells,
    cols,
    total: dated.reduce((s, d) => s + d.count, 0),
    active: dated.filter((d) => d.count).length,
    streak,
    busiest: { label: busiest.label, count: busiest.count },
    months,
  }
}

/** The saved contribution data. Swap this for a fetch (e.g. an API route) to make it live. */
export function getContributionGraph(): ContributionGraph {
  return layoutContributions((raw as { contributions: Day[] }).contributions)
}
