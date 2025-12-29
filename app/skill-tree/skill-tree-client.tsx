"use client"

import { useState, useRef } from "react"
import { 
  Code2, 
  Database, 
  Rocket, 
  Server,
  Smartphone,
  Cloud,
  Brain,
  Container,
  Lock,
  Zap,
  Shield,
  Cpu,
  Network,
  Box,
  Workflow,
  FileCode,
  Blocks,
  Sparkles,
  GitBranch,
  Layers,
  type LucideIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Loader2,
  Unlock
} from "lucide-react"
import { cn } from "@/lib/utils"

// Tech logo SVG components
const JavaScriptLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
  </svg>
)

const ReactLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.099 2.21-.099zm-3.635.864c-.198.5-.37 1.006-.52 1.52-.45.16-.88.325-1.29.51-.324-.85-.512-1.63-.512-2.264 0-.637.192-1.414.515-2.264.41.185.844.35 1.29.51.148.517.32 1.021.517 1.528zm.818 1.388c.18.723.405 1.455.675 2.18-.27.726-.495 1.458-.675 2.182-.673-.26-1.285-.562-1.82-.905-.573-.366-1.04-.75-1.38-1.132.34-.382.807-.766 1.38-1.132.535-.343 1.147-.645 1.82-.905l.005-.288zm6.48 2.18c-.18-.722-.405-1.454-.675-2.18.27-.725.495-1.457.675-2.18.673.26 1.285.56 1.82.903.573.367 1.04.75 1.38 1.133-.34.383-.807.766-1.38 1.132-.535.344-1.147.646-1.82.906l-.005.286zm-1.802-1.002c.172.49.327.992.459 1.508-.455.054-.924.08-1.401.08s-.946-.026-1.401-.08c.132-.516.287-1.017.459-1.508.172.49.327.992.459 1.508l.925-.508zm2.264 2.652c-.197-.5-.37-1.007-.518-1.52.673-.26 1.285-.563 1.82-.905.573-.367 1.04-.75 1.38-1.133-.34-.383-.807-.766-1.38-1.132-.535-.344-1.147-.646-1.82-.905.148-.517.32-1.021.518-1.528.45-.16.88-.325 1.29-.51.324.85.512 1.63.512 2.264 0 .637-.192 1.414-.515 2.264-.41-.185-.844-.35-1.29-.51l.003.075zm-7.297 5.61c-.225 0-.406-.044-.558-.127-.666-.382-.955-1.835-.73-3.704.054-.46.142-.945.25-1.44.96.236 2.006.417 3.107.534.66.905 1.345 1.727 2.035 2.447-1.592 1.48-3.087 2.292-4.104 2.295v-.005zm9.77-.02c-1.012 0-2.514-.808-4.11-2.28.686-.72 1.37-1.537 2.02-2.442 1.107-.117 2.154-.298 3.113-.538.112.49.195.964.254 1.42.23 1.868-.054 3.32-.714 3.707-.19.09-.4.127-.563.132z"/>
  </svg>
)

const NodeJSLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
  </svg>
)

const PythonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
  </svg>
)

const GitLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
  </svg>
)

const DockerLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.033-1.01.098-.31-1.186-1.095-2.195-2.368-3.066l-.484-.33-.31.5c-.607.96-.694 2.474-.141 3.499.189.349.456.667.784.933-.547.194-1.117.308-1.692.308H.79l-.116.694c-.057.381-.09.763-.09 1.146 0 1.034.11 2.063.33 3.064.438 2.001 1.295 3.654 2.548 4.912C5.57 22.849 8.58 24 12.237 24c8.26 0 14.718-4.244 16.21-13.368.893.047 1.785-.078 2.553-.372.766-.294 1.384-.745 1.842-1.344l.197-.251-.744-.632c-.896.63-1.95.95-3.045.95-.7 0-1.383-.14-2.052-.417z"/>
  </svg>
)

const MongoDBLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
  </svg>
)

const PostgreSQLLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.111 5.441c-.528-.315-1.353-.535-2.376-.535-1.154 0-2.135.27-2.747.561l.005-.005c-1.273.605-2.155 1.69-2.863 2.925-.6.8-1.114 1.715-1.553 2.695-.54 1.21-.983 2.495-1.372 3.79l-.014.01c-.09.225-.18.45-.27.675-.18.45-.36.9-.63 1.26-.36.54-.9.855-1.53 1.125-.36.09-.675.27-1.035.36-.36.09-.72.18-1.08.36-.54.27-1.08.63-1.44 1.08-.36.45-.72.945-1.08 1.44-.36.495-.63 1.035-.81 1.575-.09.27-.09.54-.09.81 0 .27.09.54.27.81.27.45.72.81 1.26 1.08.63.36 1.35.54 2.07.54.45 0 .9-.09 1.35-.18.54-.135 1.035-.315 1.53-.54.405-.18.81-.405 1.17-.675.315-.225.63-.495.9-.765.225-.225.405-.495.585-.765.135-.225.225-.495.315-.765.09-.36.135-.72.135-1.08 0-.36-.045-.72-.135-1.08-.045-.18-.135-.36-.225-.54-.09-.18-.225-.36-.36-.54-.135-.18-.315-.315-.495-.45-.18-.135-.405-.225-.63-.315-.27-.09-.54-.135-.81-.135-.36 0-.72.045-1.08.135-.36.09-.72.225-1.035.405-.36.18-.675.405-.945.675-.27.27-.495.585-.675.9-.135.27-.225.54-.225.81 0 .225.045.45.135.675.09.18.225.36.36.495.135.135.315.225.495.315.18.045.36.09.54.09h.09c.18 0 .36-.045.54-.135.135-.045.27-.135.405-.225.135-.09.225-.225.315-.36.045-.135.09-.27.09-.405 0-.135-.045-.27-.09-.405-.045-.135-.135-.225-.225-.315-.09-.09-.225-.135-.36-.18-.135-.045-.27-.045-.405-.045h-.18c-.135 0-.27.045-.405.09-.135.045-.225.135-.315.225l-.045.045c-.045.045-.09.09-.135.135-.045.045-.09.135-.09.225 0 .09.045.18.09.27.045.09.135.135.225.18.09.045.18.045.27.045h.045c.09 0 .18-.045.27-.09.09-.045.135-.135.18-.225.045-.09.045-.18.045-.27 0-.135-.045-.27-.135-.405-.09-.135-.225-.225-.36-.315-.135-.09-.315-.135-.495-.135-.18 0-.36.045-.54.135-.18.09-.315.225-.45.36-.135.135-.225.315-.27.495-.045.18-.045.36 0 .54.045.18.135.315.27.45.135.135.315.225.495.27.18.045.36.045.54 0 .18-.045.36-.135.495-.27.135-.135.225-.315.27-.495.045-.18.045-.36 0-.54-.045-.18-.135-.315-.27-.45-.135-.135-.315-.225-.495-.27-.18-.045-.36-.045-.54 0-.18.045-.36.135-.495.27-.135.135-.225.315-.27.495-.045.18-.045.36 0 .54.045.18.135.315.27.45.135.135.315.225.495.27.18.045.36.045.54 0 .18-.045.36-.135.495-.27.135-.135.225-.315.27-.495.045-.18.045-.36 0-.54-.045-.18-.135-.315-.27-.45-.135-.135-.315-.225-.495-.27z"/>
  </svg>
)

type SkillStatus = "unlocked" | "in-progress" | "locked"

type SkillNode = {
  id: string
  name: string
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  status: SkillStatus
  description: string
  x: number
  y: number
  connections: string[]
}

// Skill tree layout - clean, minimal connections
const skillNodes: SkillNode[] = [
  // === CORE (Top - Starting point) ===
  { id: "programming", name: "Programming", icon: Code2, status: "unlocked", description: "Foundation of all development", x: 50, y: 8, connections: ["javascript", "python", "git"] },
  
  // === Level 1 - Core Languages ===
  { id: "javascript", name: "JavaScript", icon: JavaScriptLogo, status: "unlocked", description: "Web's programming language", x: 20, y: 22, connections: ["react", "nodejs"] },
  { id: "python", name: "Python", icon: PythonLogo, status: "unlocked", description: "Versatile scripting language", x: 75, y: 22, connections: ["fastapi", "applied-ai"] },
  { id: "git", name: "Git", icon: GitLogo, status: "unlocked", description: "Version control mastery", x: 50, y: 22, connections: ["docker"] },
  
  // === Level 2 - Frameworks ===
  { id: "react", name: "React", icon: ReactLogo, status: "unlocked", description: "UI component library", x: 12, y: 38, connections: ["nextjs", "react-native"] },
  { id: "nodejs", name: "Node.js", icon: NodeJSLogo, status: "unlocked", description: "JavaScript runtime", x: 28, y: 38, connections: ["express"] },
  { id: "fastapi", name: "FastAPI", icon: Zap, status: "unlocked", description: "Modern Python API", x: 62, y: 38, connections: ["graphql"] },
  { id: "docker", name: "Docker", icon: DockerLogo, status: "unlocked", description: "Containerization", x: 50, y: 38, connections: ["kubernetes"] },
  { id: "applied-ai", name: "Applied AI", icon: Brain, status: "unlocked", description: "AI integration", x: 82, y: 38, connections: ["langchain", "pytorch"] },
  
  // === Level 3 - Advanced ===
  { id: "nextjs", name: "Next.js", icon: Rocket, status: "unlocked", description: "React framework", x: 6, y: 54, connections: [] },
  { id: "react-native", name: "React Native", icon: Smartphone, status: "unlocked", description: "Mobile development", x: 18, y: 54, connections: ["expo"] },
  { id: "express", name: "Express", icon: Server, status: "unlocked", description: "Node.js framework", x: 28, y: 54, connections: ["mongodb"] },
  { id: "graphql", name: "GraphQL", icon: Network, status: "in-progress", description: "Query language for APIs", x: 62, y: 54, connections: ["prisma"] },
  { id: "kubernetes", name: "Kubernetes", icon: Network, status: "locked", description: "Container orchestration", x: 50, y: 54, connections: ["terraform", "golang"] },
  { id: "langchain", name: "LangChain", icon: Network, status: "unlocked", description: "LLM framework", x: 76, y: 54, connections: ["agents"] },
  { id: "pytorch", name: "PyTorch", icon: Cpu, status: "in-progress", description: "Deep learning", x: 88, y: 54, connections: ["mlops"] },
  
  // === Level 4 - Specialized ===
  { id: "expo", name: "Expo", icon: Smartphone, status: "unlocked", description: "React Native tooling", x: 18, y: 70, connections: [] },
  { id: "mongodb", name: "MongoDB", icon: MongoDBLogo, status: "unlocked", description: "NoSQL database", x: 28, y: 70, connections: ["postgres"] },
  { id: "postgres", name: "PostgreSQL", icon: PostgreSQLLogo, status: "unlocked", description: "SQL database", x: 28, y: 82, connections: [] },
  { id: "drizzle", name: "Drizzle", icon: Database, status: "unlocked", description: "Type-safe ORM", x: 62, y: 70, connections: [] },
  { id: "terraform", name: "Terraform", icon: Blocks, status: "locked", description: "Infrastructure as Code", x: 50, y: 70, connections: [] },
  { id: "agents", name: "AI Agents", icon: Brain, status: "unlocked", description: "Autonomous AI", x: 76, y: 70, connections: [] },
  { id: "mlops", name: "MLOps", icon: Workflow, status: "locked", description: "ML operations", x: 88, y: 70, connections: [] },
  { id: "golang", name: "Go", icon: Blocks, status: "locked", description: "Efficient backend", x: 50, y: 70, connections: [] },
  
  // === Level 5 - Expert ===
  { id: "rust", name: "Rust", icon: Shield, status: "locked", description: "Systems programming", x: 65, y: 86, connections: [] },
]

function SkillNodeComponent({ 
  node, 
  isSelected, 
  onSelect,
  scale 
}: { 
  node: SkillNode
  isSelected: boolean
  onSelect: (node: SkillNode) => void
  scale: number
}) {
  const NodeIcon = node.icon
  
  return (
    <button
      onClick={() => onSelect(node)}
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        node.status === "locked" && "opacity-40"
      )}
      style={{ 
        left: `${node.x}%`, 
        top: `${node.y}%`,
      }}
      aria-label={`${node.name} - ${node.status}`}
    >
      {/* Node circle - monochrome style */}
      <div 
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-300",
          "border border-white/10 bg-[color:var(--bg-700)]",
          node.status === "unlocked" && "bg-[color:var(--fg)] border-[color:var(--fg)]",
          node.status === "in-progress" && "bg-[color:var(--bg-800)] border-[color:var(--muted)] ring-2 ring-[color:var(--muted)]/30",
          node.status === "locked" && "bg-[color:var(--bg-800)]/50 border-white/5",
          isSelected && "ring-2 ring-[color:var(--fg)] scale-110",
          "group-hover:scale-110",
          scale < 0.7 ? "w-8 h-8" : "w-11 h-11 sm:w-12 sm:h-12"
        )}
      >
        {node.status === "locked" ? (
          <Lock className={cn(
            scale < 0.7 ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5", 
            "text-[color:var(--muted)]/50"
          )} />
        ) : node.status === "in-progress" ? (
          <Loader2 className={cn(
            scale < 0.7 ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5", 
            "text-[color:var(--muted)] animate-spin"
          )} />
        ) : (
          <NodeIcon className={cn(
            scale < 0.7 ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5", 
            "text-[color:var(--bg-900)]"
          )} />
        )}
      </div>
      
      {/* Label */}
      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-center transition-opacity",
        scale < 0.6 ? "opacity-0" : "opacity-100",
        scale < 0.8 ? "text-[9px]" : "text-[10px] sm:text-xs"
      )}>
        <span className={cn(
          "font-medium",
          node.status === "locked" ? "text-[color:var(--muted)]/40" : "text-[color:var(--fg)]"
        )}>
          {node.name}
        </span>
      </div>
    </button>
  )
}

function ConnectionLine({ 
  from, 
  to, 
  isUnlocked 
}: { 
  from: SkillNode
  to: SkillNode
  isUnlocked: boolean 
}) {
  return (
    <line
      x1={`${from.x}%`}
      y1={`${from.y}%`}
      x2={`${to.x}%`}
      y2={`${to.y}%`}
      stroke={isUnlocked ? "var(--fg)" : "var(--muted)"}
      strokeWidth={isUnlocked ? 2 : 1}
      strokeLinecap="round"
      strokeOpacity={isUnlocked ? 0.6 : 0.15}
      className="transition-all duration-500"
    />
  )
}

export default function SkillTreeClient() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  const stats = {
    unlocked: skillNodes.filter(n => n.status === "unlocked").length,
    inProgress: skillNodes.filter(n => n.status === "in-progress").length,
    locked: skillNodes.filter(n => n.status === "locked").length,
    total: skillNodes.length,
  }
  
  const handleZoomIn = () => setScale(s => Math.min(s + 0.2, 2))
  const handleZoomOut = () => setScale(s => Math.max(s - 0.2, 0.4))
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === "svg") {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }
  
  const handleMouseUp = () => setIsDragging(false)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y })
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0]
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      })
    }
  }
  
  return (
    <div className="space-y-4">
      {/* Stats Bar - Monochrome */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[color:var(--fg)]" />
            <span className="text-sm text-[color:var(--muted)]">
              <span className="font-semibold text-[color:var(--fg)]">{stats.unlocked}</span> Mastered
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full border-2 border-[color:var(--muted)] bg-transparent" />
            <span className="text-sm text-[color:var(--muted)]">
              <span className="font-semibold text-[color:var(--fg)]">{stats.inProgress}</span> Learning
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[color:var(--muted)]/30" />
            <span className="text-sm text-[color:var(--muted)]">
              <span className="font-semibold text-[color:var(--fg)]">{stats.locked}</span> Locked
            </span>
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="rounded-lg p-2 text-[color:var(--muted)] hover:bg-white/5 hover:text-[color:var(--fg)] transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-xs text-[color:var(--muted)]">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="rounded-lg p-2 text-[color:var(--muted)] hover:bg-white/5 hover:text-[color:var(--fg)] transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleReset}
            className="rounded-lg p-2 text-[color:var(--muted)] hover:bg-white/5 hover:text-[color:var(--fg)] transition-colors"
            aria-label="Reset view"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <p className="text-xs text-[color:var(--muted)]">
        Drag to pan • Use buttons to zoom • Click nodes for details
      </p>
      
      {/* Skill Tree Canvas */}
      <div 
        ref={containerRef}
        className="relative h-[500px] sm:h-[600px] overflow-hidden rounded-xl border border-white/10 bg-[color:var(--bg-800)]/50"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--fg) 1px, transparent 1px),
              linear-gradient(90deg, var(--fg) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px"
          }}
        />
        
        {/* Tree content */}
        <div 
          className="absolute inset-0 transition-transform duration-100"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center"
          }}
        >
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {skillNodes.map(node => 
              node.connections.map(targetId => {
                const target = skillNodes.find(n => n.id === targetId)
                if (!target) return null
                const isUnlocked = node.status === "unlocked" && target.status !== "locked"
                return (
                  <ConnectionLine 
                    key={`${node.id}-${targetId}`}
                    from={node}
                    to={target}
                    isUnlocked={isUnlocked}
                  />
                )
              })
            )}
          </svg>
          
          {/* Skill nodes */}
          {skillNodes.map(node => (
            <SkillNodeComponent
              key={node.id}
              node={node}
              isSelected={selectedNode?.id === node.id}
              onSelect={setSelectedNode}
              scale={scale}
            />
          ))}
        </div>
      </div>
      
      {/* Selected Node Details */}
      {selectedNode && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start gap-4">
            <div 
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl border",
                selectedNode.status === "unlocked" && "bg-[color:var(--fg)] border-[color:var(--fg)]",
                selectedNode.status === "in-progress" && "bg-[color:var(--bg-700)] border-[color:var(--muted)]",
                selectedNode.status === "locked" && "bg-[color:var(--bg-800)] border-white/10"
              )}
            >
              {selectedNode.status === "locked" ? (
                <Lock className="h-5 w-5 text-[color:var(--muted)]/50" />
              ) : selectedNode.status === "in-progress" ? (
                <Loader2 className="h-5 w-5 text-[color:var(--muted)] animate-spin" />
              ) : (
                <selectedNode.icon className="h-5 w-5 text-[color:var(--bg-900)]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-[color:var(--fg)]">{selectedNode.name}</h3>
                <span 
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border",
                    selectedNode.status === "unlocked" && "border-[color:var(--fg)]/20 bg-[color:var(--fg)]/10 text-[color:var(--fg)]",
                    selectedNode.status === "in-progress" && "border-[color:var(--muted)]/20 bg-[color:var(--muted)]/10 text-[color:var(--muted)]",
                    selectedNode.status === "locked" && "border-white/10 bg-white/5 text-[color:var(--muted)]/60"
                  )}
                >
                  {selectedNode.status === "unlocked" && <Unlock className="h-3 w-3" />}
                  {selectedNode.status === "in-progress" && <Loader2 className="h-3 w-3 animate-spin" />}
                  {selectedNode.status === "locked" && <Lock className="h-3 w-3" />}
                  {selectedNode.status === "unlocked" ? "Mastered" : selectedNode.status === "in-progress" ? "Learning" : "Locked"}
                </span>
              </div>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{selectedNode.description}</p>
              {selectedNode.connections.length > 0 && (
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  <span className="text-[color:var(--fg)]">Unlocks:</span>{" "}
                  {selectedNode.connections.map(id => 
                    skillNodes.find(n => n.id === id)?.name
                  ).join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[color:var(--muted)]">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--fg)]">
              <Unlock className="h-3 w-3 text-[color:var(--bg-900)]" />
            </div>
            <span>Mastered — Skills I use confidently</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[color:var(--muted)] bg-[color:var(--bg-800)]">
              <Loader2 className="h-3 w-3 text-[color:var(--muted)] animate-spin" />
            </div>
            <span>Learning — Currently exploring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--bg-800)]/50 border border-white/5">
              <Lock className="h-3 w-3 text-[color:var(--muted)]/50" />
            </div>
            <span>Locked — Future goals</span>
          </div>
        </div>
      </div>
    </div>
  )
}
