import data from "@/data/projects.json"

export type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  live: string
  repo: string
  featured: boolean
}

const projects = data.projects as Project[]

// One key per technology, so "Reactjs" and "React" read the same.
const TAG_LABEL: Record<string, string> = {
  nextjs: "Next.js",
  tailwindcss: "Tailwind",
  fastapi: "FastAPI",
  react: "React",
  gemini: "Gemini",
  zustand: "Zustand",
  mongodb: "MongoDB",
  threejs: "Three.js",
  phaserjs: "Phaser",
  "node.js": "Node.js",
  express: "Express",
  pinecone: "Pinecone",
  qdrant: "Qdrant",
  langchain: "LangChain",
  javascript: "JavaScript",
  typescript: "TypeScript",
}

const tagKey = (t: string) => {
  const k = t.toLowerCase()
  return k === "reactjs" ? "react" : k
}

export const tagLabel = (t: string) => TAG_LABEL[tagKey(t)] || t

export const sentence = (s: string) => (s ? s[0].toUpperCase() + s.slice(1).replace(/\s*\.?$/, ".") : "")

export const featuredProjects = () => projects.filter((p) => p.featured)

/** Featured first, then the rest. */
export const allProjects = () => [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)]
