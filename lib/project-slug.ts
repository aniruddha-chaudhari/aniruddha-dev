/** Stable URL slug for a project, e.g. "Aether Cart" -> "aether-cart". */
export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
