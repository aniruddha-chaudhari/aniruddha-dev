import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = getSiteUrl()

  return {
    name: "Aniruddha • Portfolio",
    short_name: "Aniruddha",
    description:
      "Full‑stack developer portfolio featuring projects, skills, and experience building modern web apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#0b0b0b",
    icons: [
      {
        src: `${baseUrl}/icon`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

