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
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)"/>
  </svg>
)

const AIAgentLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2M12 4.5L11.5 7.5L8.5 8L11.5 8.5L12 11.5L12.5 8.5L15.5 8L12.5 7.5L12 4.5M7.5 12L8.5 16L12 17L8.5 18L7.5 22L6.5 18L3 17L6.5 16L7.5 12M16.5 12L17.5 16L21 17L17.5 18L16.5 22L15.5 18L12 17L15.5 16L16.5 12Z"/>
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
    <path d="M8 8h2v2H8V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zM8 12h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM8 16h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
    <path d="M20 10v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8h16zm2-2H2v10a4 4 0 004 4h12a4 4 0 004-4V8z"/>
  </svg>
)

const MongoDBLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
  </svg>
)

const ExpressLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 18.588a1.529 1.529 0 0 1 -1.895 -0.72l-3.45 -4.771 -0.5 -0.667 -4.003 5.444a1.466 1.466 0 0 1 -1.802 0.708l5.158 -6.92 -4.798 -6.251a1.595 1.595 0 0 1 1.9 0.666l3.576 4.83 3.596 -4.81a1.435 1.435 0 0 1 1.788 -0.668L21.708 7.9l-2.522 3.283a0.666 0.666 0 0 0 0 0.994l4.804 6.412zM0.002 11.576l0.42 -2.075c1.154 -4.103 5.858 -5.81 9.094 -3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C0.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582 -2.876c0.207 -0.666 0.548 -0.78 1.174 -0.588a5.417 5.417 0 0 1 -2.589 3.957 6.272 6.272 0 0 1 -7.306 -0.933 6.575 6.575 0 0 1 -1.64 -3.858c0 -0.235 -0.08 -0.455 -0.134 -0.666A88.33 88.33 0 0 1 0 11.577zm1.127 -0.286h9.654c-0.06 -3.076 -2.001 -5.258 -4.59 -5.278 -2.882 -0.04 -4.944 2.094 -5.071 5.264z"/>
  </svg>
)

const NextJSLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583 -1.574 6.801 -4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332 -8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
  </svg>
)
const DrizzleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M5.353 11.823a1.036 1.036 0 0 0 -0.395 -1.422 1.063 1.063 0 0 0 -1.437 0.399L0.138 16.702a1.035 1.035 0 0 0 0.395 1.422 1.063 1.063 0 0 0 1.437 -0.398l3.383 -5.903Zm11.216 0a1.036 1.036 0 0 0 -0.394 -1.422 1.064 1.064 0 0 0 -1.438 0.399l-3.382 5.902a1.036 1.036 0 0 0 0.394 1.422c0.506 0.283 1.15 0.104 1.438 -0.398l3.382 -5.903Zm7.293 -4.525a1.036 1.036 0 0 0 -0.395 -1.422 1.062 1.062 0 0 0 -1.437 0.399l-3.383 5.902a1.036 1.036 0 0 0 0.395 1.422 1.063 1.063 0 0 0 1.437 -0.399l3.383 -5.902Zm-11.219 0a1.035 1.035 0 0 0 -0.394 -1.422 1.064 1.064 0 0 0 -1.438 0.398l-3.382 5.903a1.036 1.036 0 0 0 0.394 1.422c0.506 0.282 1.15 0.104 1.438 -0.399l3.382 -5.902Z"/>
  </svg>
)
const PostgreSQLLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.5594 14.7228a0.5269 0.5269 0 0 0 -0.0563 -0.1191c-0.139 -0.2632 -0.4768 -0.3418 -1.0074 -0.2321 -1.6533 0.3411 -2.2935 0.1312 -2.5256 -0.0191 1.342 -2.0482 2.445 -4.522 3.0411 -6.8297 0.2714 -1.0507 0.7982 -3.5237 0.1222 -4.7316a1.5641 1.5641 0 0 0 -0.1509 -0.235C21.6931 0.9086 19.8007 0.0248 17.5099 0.0005c-1.4947 -0.0158 -2.7705 0.3461 -3.1161 0.4794a9.449 9.449 0 0 0 -0.5159 -0.0816 8.044 8.044 0 0 0 -1.3114 -0.1278c-1.1822 -0.0184 -2.2038 0.2642 -3.0498 0.8406 -0.8573 -0.3211 -4.7888 -1.645 -7.2219 0.0788C0.9359 2.1526 0.3086 3.8733 0.4302 6.3043c0.0409 0.818 0.5069 3.334 1.2423 5.7436 0.4598 1.5065 0.9387 2.7019 1.4334 3.582 0.553 0.9942 1.1259 1.5933 1.7143 1.7895 0.4474 0.1491 1.1327 0.1441 1.8581 -0.7279 0.8012 -0.9635 1.5903 -1.8258 1.9446 -2.2069 0.4351 0.2355 0.9064 0.3625 1.39 0.3772a0.0569 0.0569 0 0 0 0.0004 0.0041 11.0312 11.0312 0 0 0 -0.2472 0.3054c-0.3389 0.4302 -0.4094 0.5197 -1.5002 0.7443 -0.3102 0.064 -1.1344 0.2339 -1.1464 0.8115 -0.0025 0.1224 0.0329 0.2309 0.0919 0.3268 0.2269 0.4231 0.9216 0.6097 1.015 0.6331 1.3345 0.3335 2.5044 0.092 3.3714 -0.6787 -0.017 2.231 0.0775 4.4174 0.3454 5.0874 0.2212 0.5529 0.7618 1.9045 2.4692 1.9043 0.2505 0 0.5263 -0.0291 0.8296 -0.0941 1.7819 -0.3821 2.5557 -1.1696 2.855 -2.9059 0.1503 -0.8707 0.4016 -2.8753 0.5388 -4.1012 0.0169 -0.0703 0.0357 -0.1207 0.057 -0.1362 0.0007 -0.0005 0.0697 -0.0471 0.4272 0.0307a0.3673 0.3673 0 0 0 0.0443 0.0068l0.2539 0.0223 0.0149 0.001c0.8468 0.0384 1.9114 -0.1426 2.5312 -0.4308 0.6438 -0.2988 1.8057 -1.0323 1.5951 -1.6698zM2.371 11.8765c-0.7435 -2.4358 -1.1779 -4.8851 -1.2123 -5.5719 -0.1086 -2.1714 0.4171 -3.6829 1.5623 -4.4927 1.8367 -1.2986 4.8398 -0.5408 6.108 -0.13 -0.0032 0.0032 -0.0066 0.0061 -0.0098 0.0094 -2.0238 2.044 -1.9758 5.536 -1.9708 5.7495 -0.0002 0.0823 0.0066 0.1989 0.0162 0.3593 0.0348 0.5873 0.0996 1.6804 -0.0735 2.9184 -0.1609 1.1504 0.1937 2.2764 0.9728 3.0892 0.0806 0.0841 0.1648 0.1631 0.2518 0.2374 -0.3468 0.3714 -1.1004 1.1926 -1.9025 2.1576 -0.5677 0.6825 -0.9597 0.5517 -1.0886 0.5087 -0.3919 -0.1307 -0.813 -0.5871 -1.2381 -1.3223 -0.4796 -0.839 -0.9635 -2.0317 -1.4155 -3.5126zm6.0072 5.0871c-0.1711 -0.0428 -0.3271 -0.1132 -0.4322 -0.1772 0.0889 -0.0394 0.2374 -0.0902 0.4833 -0.1409 1.2833 -0.2641 1.4815 -0.4506 1.9143 -1.0002 0.0992 -0.126 0.2116 -0.2687 0.3673 -0.4426a0.3549 0.3549 0 0 0 0.0737 -0.1298c0.1708 -0.1513 0.2724 -0.1099 0.4369 -0.0417 0.156 0.0646 0.3078 0.26 0.3695 0.4752 0.0291 0.1016 0.0619 0.2945 -0.0452 0.4444 -0.9043 1.2658 -2.2216 1.2494 -3.1676 1.0128zm2.094 -3.988 -0.0525 0.141c-0.133 0.3566 -0.2567 0.6881 -0.3334 1.003 -0.6674 -0.0021 -1.3168 -0.2872 -1.8105 -0.8024 -0.6279 -0.6551 -0.9131 -1.5664 -0.7825 -2.5004 0.1828 -1.3079 0.1153 -2.4468 0.079 -3.0586 -0.005 -0.0857 -0.0095 -0.1607 -0.0122 -0.2199 0.2957 -0.2621 1.6659 -0.9962 2.6429 -0.7724 0.4459 0.1022 0.7176 0.4057 0.8305 0.928 0.5846 2.7038 0.0774 3.8307 -0.3302 4.7363 -0.084 0.1866 -0.1633 0.3629 -0.2311 0.5454zm7.3637 4.5725c-0.0169 0.1768 -0.0358 0.376 -0.0618 0.5959l-0.146 0.4383a0.3547 0.3547 0 0 0 -0.0182 0.1077c-0.0059 0.4747 -0.054 0.6489 -0.115 0.8693 -0.0634 0.2292 -0.1353 0.4891 -0.1794 1.0575 -0.11 1.4143 -0.8782 2.2267 -2.4172 2.5565 -1.5155 0.3251 -1.7843 -0.4968 -2.0212 -1.2217a6.5824 6.5824 0 0 0 -0.0769 -0.2266c-0.2154 -0.5858 -0.1911 -1.4119 -0.1574 -2.5551 0.0165 -0.5612 -0.0249 -1.9013 -0.3302 -2.6462 0.0044 -0.2932 0.0106 -0.5909 0.019 -0.8918a0.3529 0.3529 0 0 0 -0.0153 -0.1126 1.4927 1.4927 0 0 0 -0.0439 -0.208c-0.1226 -0.4283 -0.4213 -0.7866 -0.7797 -0.9351 -0.1424 -0.059 -0.4038 -0.1672 -0.7178 -0.0869 0.067 -0.276 0.1831 -0.5875 0.309 -0.9249l0.0529 -0.142c0.0595 -0.16 0.134 -0.3257 0.213 -0.5012 0.4265 -0.9476 1.0106 -2.2453 0.3766 -5.1772 -0.2374 -1.0981 -1.0304 -1.6343 -2.2324 -1.5098 -0.7207 0.0746 -1.3799 0.3654 -1.7088 0.5321a5.6716 5.6716 0 0 0 -0.1958 0.1041c0.0918 -1.1064 0.4386 -3.1741 1.7357 -4.4823a4.0306 4.0306 0 0 1 0.3033 -0.276 0.3532 0.3532 0 0 0 0.1447 -0.0644c0.7524 -0.5706 1.6945 -0.8506 2.802 -0.8325 0.4091 0.0067 0.8017 0.0339 1.1742 0.081 1.939 0.3544 3.2439 1.4468 4.0359 2.3827 0.8143 0.9623 1.2552 1.9315 1.4312 2.4543 -1.3232 -0.1346 -2.2234 0.1268 -2.6797 0.779 -0.9926 1.4189 0.543 4.1729 1.2811 5.4964 0.1353 0.2426 0.2522 0.4522 0.2889 0.5413 0.2403 0.5825 0.5515 0.9713 0.7787 1.2552 0.0696 0.087 0.1372 0.1714 0.1885 0.245 -0.4008 0.1155 -1.1208 0.3825 -1.0552 1.717 -0.0123 0.1563 -0.0423 0.4469 -0.0834 0.8148 -0.0461 0.2077 -0.0702 0.4603 -0.0994 0.7662zm0.8905 -1.6211c-0.0405 -0.8316 0.2691 -0.9185 0.5967 -1.0105a2.8566 2.8566 0 0 0 0.135 -0.0406 1.202 1.202 0 0 0 0.1342 0.103c0.5703 0.3765 1.5823 0.4213 3.0068 0.1344 -0.2016 0.1769 -0.5189 0.3994 -0.9533 0.6011 -0.4098 0.1903 -1.0957 0.333 -1.7473 0.3636 -0.7197 0.0336 -1.0859 -0.0807 -1.1721 -0.151zm0.5695 -9.2712c-0.0059 0.3508 -0.0542 0.6692 -0.1054 1.0017 -0.055 0.3576 -0.112 0.7274 -0.1264 1.1762 -0.0142 0.4368 0.0404 0.8909 0.0932 1.3301 0.1066 0.887 0.216 1.8003 -0.2075 2.7014a3.5272 3.5272 0 0 1 -0.1876 -0.3856c-0.0527 -0.1276 -0.1669 -0.3326 -0.3251 -0.6162 -0.6156 -1.1041 -2.0574 -3.6896 -1.3193 -4.7446 0.3795 -0.5427 1.3408 -0.5661 2.1781 -0.463zm0.2284 7.0137a12.3762 12.3762 0 0 0 -0.0853 -0.1074l-0.0355 -0.0444c0.7262 -1.1995 0.5842 -2.3862 0.4578 -3.4385 -0.0519 -0.4318 -0.1009 -0.8396 -0.0885 -1.2226 0.0129 -0.4061 0.0666 -0.7543 0.1185 -1.0911 0.0639 -0.415 0.1288 -0.8443 0.1109 -1.3505 0.0134 -0.0531 0.0188 -0.1158 0.0118 -0.1902 -0.0457 -0.4855 -0.5999 -1.938 -1.7294 -3.253 -0.6076 -0.7073 -1.4896 -1.4972 -2.6889 -2.0395 0.5251 -0.1066 1.2328 -0.2035 2.0244 -0.1859 2.0515 0.0456 3.6746 0.8135 4.8242 2.2824a0.908 0.908 0 0 1 0.0667 0.1002c0.7231 1.3556 -0.2762 6.2751 -2.9867 10.5405zm-8.8166 -6.1162c-0.025 0.1794 -0.3089 0.4225 -0.6211 0.4225a0.5821 0.5821 0 0 1 -0.0809 -0.0056c-0.1873 -0.026 -0.3765 -0.144 -0.5059 -0.3156 -0.0458 -0.0605 -0.1203 -0.178 -0.1055 -0.2844 0.0055 -0.0401 0.0261 -0.0985 0.0925 -0.1488 0.1182 -0.0894 0.3518 -0.1226 0.6096 -0.0867 0.3163 0.0441 0.6426 0.1938 0.6113 0.4186zm7.9305 -0.4114c0.0111 0.0792 -0.049 0.201 -0.1531 0.3102 -0.0683 0.0717 -0.212 0.1961 -0.4079 0.2232a0.5456 0.5456 0 0 1 -0.075 0.0052c-0.2935 0 -0.5414 -0.2344 -0.5607 -0.3717 -0.024 -0.1765 0.2641 -0.3106 0.5611 -0.352 0.297 -0.0414 0.6111 0.0088 0.6356 0.1851z"/>
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

// Skill tree layout - organized by learning paths
const skillNodes: SkillNode[] = [
  // === CORE (Top - Starting point) ===
  { id: "programming", name: "Programming", icon: Code2, status: "unlocked", description: "Foundation of all development", x: 50, y: 8, connections: ["javascript", "python", "git"] },
  
  // === Level 1 - Core Languages ===
  { id: "javascript", name: "JavaScript", icon: JavaScriptLogo, status: "unlocked", description: "Web's programming language", x: 20, y: 22, connections: ["react", "nodejs"] },
  { id: "git", name: "Git", icon: GitLogo, status: "unlocked", description: "Version control mastery", x: 50, y: 22, connections: ["docker"] },
  { id: "python", name: "Python", icon: PythonLogo, status: "unlocked", description: "Versatile scripting language", x: 75, y: 22, connections: ["fastapi", "applied-ai"] },
  
  // === Level 2 - Primary Frameworks & Tools ===
  { id: "react", name: "React", icon: ReactLogo, status: "unlocked", description: "UI component library", x: 12, y: 38, connections: ["nextjs", "react-native"] },
  { id: "nodejs", name: "Node.js", icon: NodeJSLogo, status: "unlocked", description: "JavaScript runtime", x: 28, y: 38, connections: ["express"] },
  { id: "docker", name: "Docker", icon: DockerLogo, status: "unlocked", description: "Containerization", x: 50, y: 38, connections: ["kubernetes"] },
  { id: "fastapi", name: "FastAPI", icon: Zap, status: "unlocked", description: "Modern Python API", x: 68, y: 38, connections: ["graphql"] },
  { id: "applied-ai", name: "Applied AI", icon: Sparkles, status: "unlocked", description: "AI integration", x: 82, y: 38, connections: ["langchain", "pytorch"] },
  
  // === Level 3 - Advanced Frameworks ===
  { id: "nextjs", name: "Next.js", icon: NextJSLogo, status: "unlocked", description: "React framework", x: 6, y: 54, connections: [] },
  { id: "react-native", name: "React Native", icon: Smartphone, status: "unlocked", description: "Mobile development", x: 18, y: 54, connections: ["expo"] },
  { id: "express", name: "Express", icon: ExpressLogo, status: "unlocked", description: "Node.js framework", x: 28, y: 54, connections: ["mongodb", "drizzle"] },
  { id: "kubernetes", name: "Kubernetes", icon: Network, status: "locked", description: "Container orchestration", x: 50, y: 54, connections: ["terraform", "golang"] },
  { id: "graphql", name: "GraphQL", icon: Network, status: "in-progress", description: "Query language for APIs", x: 62, y: 54, connections: [] },
  { id: "langchain", name: "LangChain", icon: Network, status: "unlocked", description: "LLM framework", x: 76, y: 54, connections: ["agents"] },
  { id: "pytorch", name: "PyTorch", icon: Cpu, status: "in-progress", description: "Deep learning", x: 88, y: 54, connections: ["mlops"] },
  
  // === Level 4 - Specialized & Expert Tools ===
  { id: "expo", name: "Expo", icon: Smartphone, status: "unlocked", description: "React Native tooling", x: 18, y: 70, connections: [] },
  { id: "mongodb", name: "MongoDB", icon: MongoDBLogo, status: "unlocked", description: "NoSQL database", x: 25, y: 70, connections: [] },
  { id: "drizzle", name: "Drizzle", icon: DrizzleLogo, status: "unlocked", description: "Type-safe ORM", x: 31, y: 70, connections: ["postgres"] },
  { id: "postgres", name: "PostgreSQL", icon: PostgreSQLLogo, status: "unlocked", description: "SQL database", x: 31, y: 82, connections: [] },
  { id: "terraform", name: "Terraform", icon: Blocks, status: "locked", description: "Infrastructure as Code", x: 50, y: 70, connections: [] },
  { id: "golang", name: "Go", icon: Blocks, status: "locked", description: "Efficient backend", x: 56, y: 70, connections: [] },
  { id: "agents", name: "AI Agents", icon: AIAgentLogo, status: "unlocked", description: "Autonomous AI", x: 76, y: 70, connections: [] },
  { id: "mlops", name: "MLOps", icon: Workflow, status: "locked", description: "ML operations", x: 88, y: 70, connections: [] },
  
  // === Level 5 - Systems Programming ===
  { id: "rust", name: "Rust", icon: Shield, status: "locked", description: "Systems programming", x: 50, y: 86, connections: [] },
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
