function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.NEXT_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, "")
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "https://aniruddhadev.in"
}

export const SITE = {
  name: "Aniruddha Chaudhari",
  role: "Software engineer. I build full-stack products and AI agents.",
  lede: "Agents that do real work, wrapped in fast, clean apps.",
  title: "Aniruddha Chaudhari | Software Engineer & Full-Stack Developer",
  description:
    "Aniruddha Chaudhari is a software engineer and full-stack developer building modern web applications with Next.js, React, FastAPI, AI, and cloud technologies.",
  keywords: [
    "Aniruddha Chaudhari",
    "software engineer",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "FastAPI developer",
    "AI developer",
  ],
  email: "aniruddhachaudhari2704@gmail.com",
  cv: "https://drive.google.com/file/d/1VQ517xCgiIP63xAu2NYI6ZcuSX-mp4mw/view?usp=sharing",
  github: "https://github.com/aniruddha-chaudhari",
  githubUser: "aniruddha-chaudhari",
  linkedin: "https://www.linkedin.com/in/aniruddha2704/",
  url: siteUrl(),
}

export const ABOUT = {
  currently: {
    text: "Working at ",
    link: { label: "The Hobby Tribe", href: "https://www.thehobbytribe.com" },
    after: ", a startup that runs online hobby classes and skill programs.",
  },
  focus: "Full-stack web and applied AI: Next.js front ends, FastAPI services, and retrieval agents on Gemini with Pinecone or Qdrant.",
  stack: ["React", "Next.js", "TypeScript", "FastAPI", "Express", "PostgreSQL", "MongoDB", "React Native", "Docker", "AWS EC2", "LangChain", "Gemini"],
}
