export const metadata = {
  title: "Monochrome Portfolio",
  description:
    "A calm, professional, minimal personal portfolio. Monochrome, responsive, accessible, with projects and GitHub activity.",
  openGraph: {
    title: "Monochrome Portfolio",
    description:
      "A calm, professional, minimal personal portfolio. Monochrome, responsive, accessible, with projects and GitHub activity.",
    images: ["/images/og-placeholder.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monochrome Portfolio",
    description:
      "A calm, professional, minimal personal portfolio. Monochrome, responsive, accessible, with projects and GitHub activity.",
    images: ["/images/og-placeholder.png"],
  },
}

import ClientPage from "./client-page"

export default function Page() {
  return <ClientPage />
}
