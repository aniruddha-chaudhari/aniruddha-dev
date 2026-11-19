export const SITE = {
  name: "Aniruddha Chaudhari",
  role: "Software engineer. I build full-stack products with applied AI.",
  lede: "I craft performant, resilient interfaces with a focus on clean architecture, great UX and maintainable code.",
  email: "aniruddhachaudhari2704@gmail.com",
  cv: "https://drive.google.com/file/d/1VQ517xCgiIP63xAu2NYI6ZcuSX-mp4mw/view?usp=sharing",
  github: "https://github.com/aniruddha-chaudhari",
  githubUser: "aniruddha-chaudhari",
  linkedin: "https://www.linkedin.com/in/aniruddha2704/",
  // Set NEXT_PUBLIC_SITE_URL in Vercel to the production origin so social previews use absolute URLs.
  url: (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),
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
