import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
  AnimatePresence,
} from "motion/react";
import deskScene from "@/assets/desk-scene.png";
import deskSceneWave from "@/assets/desk-scene-wave.png";
import bhavyanshImg from "@/assets/bhavyansh.png";

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const onView = {
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, amount: 0.2 },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhavyansh Mehta — CSE Student Portfolio" },
      {
        name: "description",
        content:
          "Pursuing B.Tech in Computer Science Engineering from JECRC University, Jaipur. Passionate about AI, system software, and full-stack development.",
      },
      { property: "og:title", content: "Bhavyansh Mehta — CSE Student Portfolio" },
      {
        property: "og:description",
        content: "Projects, academics, and journey of Bhavyansh Mehta, a CSE student.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

function useCounter(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function Stat({
  value,
  suffix = "",
  label,
  start,
}: {
  value: number;
  suffix?: string;
  label: string;
  start: boolean;
}) {
  const n = useCounter(value, start);
  const formatted = value % 1 === 0 ? Math.round(n).toString() : n.toFixed(2);
  return (
    <div className="flex flex-col">
      <span className="text-display text-5xl md:text-6xl text-ink">
        {formatted}
        {suffix}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
        {label}
      </span>
    </div>
  );
}

function VectorAvatar() {
  return (
    <div className="w-full rounded-2xl bg-[#e8dcc7] border-4 border-[#1c1a17] aspect-[4/5] flex items-center justify-center p-6 overflow-hidden">
      <svg viewBox="0 0 200 250" className="w-full h-full">
        <defs>
          <linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e05a47" />
            <stop offset="100%" stopColor="#2a3c3b" />
          </linearGradient>
        </defs>
        {/* Background Circle */}
        <circle cx="100" cy="110" r="85" fill="url(#avatar-grad)" opacity="0.85" />
        
        {/* Body/Shoulders */}
        <path d="M40 210 Q100 170 160 210 L150 250 L50 250 Z" fill="#2a3c3b" stroke="#1c1a17" strokeWidth="3" />
        <path d="M80 180 Q100 195 120 180" fill="none" stroke="#1c1a17" strokeWidth="3" strokeLinecap="round" />

        {/* Head & Neck */}
        <rect x="90" y="150" width="20" height="20" fill="#ecd0be" stroke="#1c1a17" strokeWidth="3" />
        <circle cx="78" cy="125" r="5" fill="#ecd0be" stroke="#1c1a17" strokeWidth="3" />
        <circle cx="122" cy="125" r="5" fill="#ecd0be" stroke="#1c1a17" strokeWidth="3" />
        <rect x="80" y="100" width="40" height="55" rx="10" fill="#ecd0be" stroke="#1c1a17" strokeWidth="3" />
        
        {/* Hair */}
        <path d="M78 106 Q80 88 100 85 Q120 88 122 106 Q123 98 115 92 Q100 88 85 92 Z" fill="#1c1a17" stroke="#1c1a17" strokeWidth="3" />
        <path d="M80 100 L85 108 L90 100" fill="#1c1a17" />
        <path d="M110 100 L115 108 L120 100" fill="#1c1a17" />

        {/* Glasses */}
        <path d="M96 122 L104 122" stroke="#1c1a17" strokeWidth="3" />
        <rect x="84" y="114" width="12" height="12" rx="3" fill="none" stroke="#1c1a17" strokeWidth="3" />
        <rect x="104" y="114" width="12" height="12" rx="3" fill="none" stroke="#1c1a17" strokeWidth="3" />
        
        {/* Eyes */}
        <circle cx="90" cy="120" r="2" fill="#1c1a17" />
        <circle cx="110" cy="120" r="2" fill="#1c1a17" />

        {/* Smile */}
        <path d="M95 135 Q100 140 105 135" fill="none" stroke="#1c1a17" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ProjectGraphic({
  title,
  tag,
  heightClass,
}: {
  title: string;
  tag: string;
  heightClass: string;
}) {
  const isAero = title.includes("Aero");
  const isStax = title.includes("Stax");
  const isTraffic = title.includes("Traffic");
  const isConsensus = title.includes("Consensus");
  const isAuth = title.includes("Auth");

  return (
    <div
      className={`w-full ${heightClass} bg-[#1e1b18] flex items-center justify-center p-8 overflow-hidden group-hover:bg-[#151311] transition-colors duration-500`}
    >
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-[280px]">
        {isAero && (
          <g id="graphic-aero">
            <defs>
              <linearGradient id="aero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7b00" />
                <stop offset="100%" stopColor="#ecd0be" />
              </linearGradient>
            </defs>

            {/* Flight Sim Grid (Perspective Lines) */}
            <g opacity="0.3">
              <line x1="0" y1="220" x2="400" y2="220" stroke="#ecd0be" strokeWidth="1" />
              <line x1="0" y1="240" x2="400" y2="240" stroke="#ecd0be" strokeWidth="1" />
              <line x1="0" y1="265" x2="400" y2="265" stroke="#ecd0be" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="290" x2="400" y2="290" stroke="#ecd0be" strokeWidth="1.5" />
              
              <line x1="200" y1="180" x2="-50" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="200" y1="180" x2="50" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="200" y1="180" x2="150" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="200" y1="180" x2="250" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="200" y1="180" x2="350" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="200" y1="180" x2="450" y2="300" stroke="#ecd0be" strokeWidth="1" />
            </g>

            {/* Radar sweep & circles */}
            <circle cx="200" cy="140" r="95" fill="none" stroke="#ff7b00" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.4" />
            <circle cx="200" cy="140" r="65" fill="none" stroke="#ecd0be" strokeWidth="1" opacity="0.2" />
            <circle cx="200" cy="140" r="35" fill="none" stroke="#ff7b00" strokeWidth="1" opacity="0.1" />
            
            <line x1="200" y1="140" x2="270" y2="75" stroke="#ff7b00" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            
            {/* Waypoints and Flight Path */}
            <path d="M 60,220 Q 130,90 200,140 T 340,80" fill="none" stroke="#ff7b00" strokeWidth="2" strokeDasharray="5,5" />
            
            <circle cx="60" cy="220" r="5" fill="#1e1b18" stroke="#ff7b00" strokeWidth="2" />
            <circle cx="150" cy="130" r="4" fill="#ecd0be" stroke="#1e1b18" strokeWidth="1.5" />
            <circle cx="270" cy="135" r="4" fill="#ecd0be" stroke="#1e1b18" strokeWidth="1.5" />
            <circle cx="340" cy="80" r="6" fill="#ff7b00" stroke="#1e1b18" strokeWidth="2" />
            <circle cx="340" cy="80" r="2" fill="#1e1b18" />

            {/* Drone Graphic */}
            <g transform="translate(200, 140) rotate(-10)">
              <path d="M-25,-5 L25,-5 L35,5 L-35,5 Z" fill="#1e1b18" stroke="#ecd0be" strokeWidth="2" />
              <circle cx="0" cy="0" r="8" fill="url(#aero-grad)" stroke="#1e1b18" strokeWidth="1.5" />
              
              <line x1="-35" y1="-20" x2="35" y2="20" stroke="#ecd0be" strokeWidth="3" strokeLinecap="round" />
              <line x1="-35" y1="20" x2="35" y2="-20" stroke="#ecd0be" strokeWidth="3" strokeLinecap="round" />
              
              <circle cx="-35" cy="-20" r="4" fill="#ff7b00" stroke="#1e1b18" strokeWidth="1" />
              <ellipse cx="-35" cy="-20" rx="14" ry="3" fill="none" stroke="#ecd0be" strokeWidth="1" opacity="0.6" />
              <circle cx="35" cy="20" r="4" fill="#ff7b00" stroke="#1e1b18" strokeWidth="1" />
              <ellipse cx="35" cy="20" rx="14" ry="3" fill="none" stroke="#ecd0be" strokeWidth="1" opacity="0.6" />
              <circle cx="-35" cy="20" r="4" fill="#ff7b00" stroke="#1e1b18" strokeWidth="1" />
              <ellipse cx="-35" cy="20" rx="14" ry="3" fill="none" stroke="#ecd0be" strokeWidth="1" opacity="0.6" />
              <circle cx="35" cy="-20" r="4" fill="#ff7b00" stroke="#1e1b18" strokeWidth="1" />
              <ellipse cx="35" cy="-20" rx="14" ry="3" fill="none" stroke="#ecd0be" strokeWidth="1" opacity="0.6" />

              <circle cx="0" cy="8" r="3" fill="#ff7b00" />
            </g>

            {/* HUD Overlay */}
            <text x="25" y="45" fill="#ff7b00" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.8">SYS.OK [AUTON]</text>
            <text x="25" y="60" fill="#ecd0be" fontSize="8" fontFamily="monospace" opacity="0.6">ALT: 124m</text>
            <text x="25" y="72" fill="#ecd0be" fontSize="8" fontFamily="monospace" opacity="0.6">BAT: 88%</text>
            
            <text x="315" y="245" fill="#ff7b00" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end" opacity="0.8">AERO_DRONE v1.2</text>
            <text x="315" y="260" fill="#ecd0be" fontSize="8" fontFamily="monospace" textAnchor="end" opacity="0.6">GPS: LOCK [12 SV]</text>

            <path d="M 190,140 L 175,140 M 210,140 L 225,140 M 200,130 L 200,115 M 200,150 L 200,165" stroke="#ff7b00" strokeWidth="1.5" opacity="0.7" />
          </g>
        )}

        {isStax && (
          <g id="graphic-stax">
            <defs>
              <linearGradient id="bun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="cheese-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="patty-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
            </defs>

            {/* Grid Pattern Background */}
            <g opacity="0.1">
              <line x1="50" y1="0" x2="50" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="250" y1="0" x2="250" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="300" y1="0" x2="300" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="350" y1="0" x2="350" y2="300" stroke="#ecd0be" strokeWidth="1" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#ecd0be" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#ecd0be" strokeWidth="1" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#ecd0be" strokeWidth="1" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#ecd0be" strokeWidth="1" />
              <line x1="0" y1="250" x2="400" y2="250" stroke="#ecd0be" strokeWidth="1" />
            </g>

            {/* Connecting Schema / Technical lines */}
            <g opacity="0.6">
              <line x1="100" y1="60" x2="100" y2="240" stroke="#ff7b00" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="300" y1="60" x2="300" y2="240" stroke="#ff7b00" strokeWidth="1.5" strokeDasharray="3,3" />
              
              <path d="M 90,80 L 70,80" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" />
              <text x="60" y="83" fill="#ff7b00" fontSize="9" fontFamily="monospace" textAnchor="end">SSR Buns</text>

              <path d="M 310,120 L 330,120" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" />
              <text x="340" y="123" fill="#ff7b00" fontSize="9" fontFamily="monospace">API Tomato</text>

              <path d="M 90,155 L 60,155" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" />
              <text x="50" y="158" fill="#ff7b00" fontSize="9" fontFamily="monospace" textAnchor="end">Core DB Patty</text>

              <path d="M 310,195 L 340,195" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" />
              <text x="350" y="198" fill="#ff7b00" fontSize="9" fontFamily="monospace">Static Bottom</text>
            </g>

            {/* The Tech Burger Stack */}
            <g transform="translate(0, 5)">
              <path d="M 120,95 C 120,45 280,45 280,95 Z" fill="url(#bun-grad)" stroke="#1e1b18" strokeWidth="2.5" />
              <ellipse cx="160" cy="70" rx="3" ry="1" fill="#fff" opacity="0.8" transform="rotate(-15, 160, 70)" />
              <ellipse cx="200" cy="65" rx="3" ry="1" fill="#fff" opacity="0.8" />
              <ellipse cx="240" cy="72" rx="3" ry="1" fill="#fff" opacity="0.8" transform="rotate(15, 240, 72)" />
              <ellipse cx="180" cy="80" rx="3" ry="1" fill="#fff" opacity="0.8" transform="rotate(10, 180, 80)" />
              <ellipse cx="220" cy="80" rx="3" ry="1" fill="#fff" opacity="0.8" transform="rotate(-10, 220, 80)" />

              <path d="M 110,110 Q 130,105 150,112 Q 170,118 190,112 Q 210,105 230,112 Q 250,118 270,112 Q 290,105 290,110 L 285,118 L 115,118 Z" fill="#10b981" stroke="#1e1b18" strokeWidth="2" />
              <circle cx="150" cy="112" r="3" fill="#fff" />
              <circle cx="230" cy="112" r="3" fill="#fff" />

              <rect x="130" y="123" width="60" height="12" rx="6" fill="#ef4444" stroke="#1e1b18" strokeWidth="2" />
              <rect x="210" y="123" width="60" height="12" rx="6" fill="#ef4444" stroke="#1e1b18" strokeWidth="2" />
              <circle cx="160" cy="129" r="2.5" fill="#fca5a5" />
              <circle cx="240" cy="129" r="2.5" fill="#fca5a5" />

              <path d="M 120,140 L 280,140 L 275,148 L 260,155 L 245,145 L 230,158 L 210,143 L 180,162 L 165,145 L 140,152 Z" fill="url(#cheese-grad)" stroke="#1e1b18" strokeWidth="2" />

              <rect x="115" y="152" width="170" height="28" rx="8" fill="url(#patty-grad)" stroke="#1e1b18" strokeWidth="2.5" />
              <line x1="145" y1="156" x2="155" y2="176" stroke="#1e1b18" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
              <line x1="175" y1="156" x2="185" y2="176" stroke="#1e1b18" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
              <line x1="205" y1="156" x2="215" y2="176" stroke="#1e1b18" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
              <line x1="235" y1="156" x2="245" y2="176" stroke="#1e1b18" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />

              <path d="M 120,188 L 280,188 C 280,213 120,213 120,188 Z" fill="url(#bun-grad)" stroke="#1e1b18" strokeWidth="2.5" />
            </g>

            {/* Technical labels */}
            <text x="200" y="270" fill="#ecd0be" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.6">stax-burger.vercel.app</text>
            <text x="200" y="285" fill="#ff7b00" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{"<StaxStack SSR={true} />"}</text>
          </g>
        )}

        {isTraffic && (
          <g id="graphic-traffic">
            {/* Street intersection lines */}
            <line
              x1="50"
              y1="150"
              x2="350"
              y2="150"
              stroke="#d5c8b2"
              strokeWidth="40"
              strokeLinecap="round"
              opacity="0.15"
            />
            <line
              x1="200"
              y1="50"
              x2="200"
              y2="250"
              stroke="#d5c8b2"
              strokeWidth="40"
              strokeLinecap="round"
              opacity="0.15"
            />
            <line
              x1="50"
              y1="150"
              x2="350"
              y2="150"
              stroke="#d5c8b2"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="200"
              y1="50"
              x2="200"
              y2="250"
              stroke="#d5c8b2"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* Bounding box / Camera scan */}
            <rect
              x="150"
              y="100"
              width="100"
              height="100"
              rx="8"
              fill="none"
              stroke="#e05a47"
              strokeWidth="2"
            />
            <line x1="130" y1="80" x2="150" y2="100" stroke="#e05a47" strokeWidth="2" />
            <line x1="270" y1="80" x2="250" y2="100" stroke="#e05a47" strokeWidth="2" />
            <line x1="130" y1="220" x2="150" y2="200" stroke="#e05a47" strokeWidth="2" />
            <line x1="270" y1="220" x2="250" y2="200" stroke="#e05a47" strokeWidth="2" />

            <circle cx="200" cy="150" r="10" fill="#e05a47" />
            <circle
              cx="200"
              cy="150"
              r="25"
              fill="none"
              stroke="#e05a47"
              strokeWidth="1.5"
              className="animate-light-pulse"
            />

            {/* UI Text */}
            <text
              x="160"
              y="120"
              fill="#e05a47"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              TARGET: DETECT
            </text>
            <text x="160" y="185" fill="#7dd3fc" fontSize="9" fontFamily="monospace">
              CONF: 98.4%
            </text>
          </g>
        )}

        {isConsensus && (
          <g id="graphic-consensus">
            {/* Consensus Nodes Ring */}
            <circle
              cx="200"
              cy="150"
              r="70"
              fill="none"
              stroke="#2a3c3b"
              strokeWidth="2"
              strokeDasharray="4,4"
            />

            {/* Leader Node */}
            <circle cx="200" cy="80" r="20" fill="#e05a47" stroke="#1c1a17" strokeWidth="3" />
            <polygon points="200,68 206,75 194,75" fill="#f0e6d6" />

            {/* Follower Nodes */}
            <circle cx="130" cy="170" r="16" fill="#2a3c3b" stroke="#1c1a17" strokeWidth="3" />
            <circle cx="270" cy="170" r="16" fill="#2a3c3b" stroke="#1c1a17" strokeWidth="3" />

            {/* Heartbeat connection lines */}
            <line
              x1="200"
              y1="100"
              x2="130"
              y2="170"
              stroke="#ecd0be"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            <line
              x1="200"
              y1="100"
              x2="270"
              y2="170"
              stroke="#ecd0be"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            <line x1="130" y1="170" x2="270" y2="170" stroke="#a69888" strokeWidth="1.5" />

            {/* Sync Waves */}
            <circle
              cx="200"
              cy="80"
              r="30"
              fill="none"
              stroke="#e05a47"
              strokeWidth="1.5"
              className="animate-light-pulse"
            />
          </g>
        )}

        {isAuth && (
          <g id="graphic-auth">
            {/* Cryptographic lock Shield */}
            <path
              d="M200,60 L280,90 L280,180 C280,230 200,260 200,260 C200,260 120,230 120,180 L120,90 Z"
              fill="#2a3c3b"
              stroke="#1c1a17"
              strokeWidth="3"
            />

            {/* Lock body */}
            <rect
              x="180"
              y="140"
              width="40"
              height="30"
              rx="5"
              fill="#e05a47"
              stroke="#1c1a17"
              strokeWidth="2"
            />
            {/* Shackle */}
            <path
              d="M190,140 L190,125 C190,110 210,110 210,125 L210,140"
              fill="none"
              stroke="#1c1a17"
              strokeWidth="2"
            />
            {/* Keyhole */}
            <circle cx="200" cy="152" r="3" fill="#1c1a17" />
            <path d="M200,152 L200,162" stroke="#1c1a17" strokeWidth="2" strokeLinecap="round" />

            {/* Math/Binary matrix */}
            <text x="140" y="110" fill="#dfd1bc" fontSize="9" fontFamily="monospace" opacity="0.6">
              ZKP
            </text>
            <text x="235" y="110" fill="#dfd1bc" fontSize="9" fontFamily="monospace" opacity="0.6">
              0x4F
            </text>
            <text x="140" y="210" fill="#dfd1bc" fontSize="8" fontFamily="monospace" opacity="0.4">
              10101
            </text>
            <text x="225" y="210" fill="#dfd1bc" fontSize="8" fontFamily="monospace" opacity="0.4">
              HASH
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function CertificateGraphic({ title }: { title: string }) {
  const isSIH = title.includes("SIH") || title.includes("Hackathon");
  const isGSoC = title.includes("GSoC") || title.includes("Google");
  const isDevHack = title.includes("DevHack") || title.includes("First");

  return (
    <div className="w-full h-64 bg-[#1e1b18] flex items-center justify-center p-6 overflow-hidden">
      <svg viewBox="0 0 250 180" className="w-full h-full max-w-[200px]">
        {/* Certificate Frame */}
        <rect
          x="10"
          y="10"
          width="230"
          height="160"
          rx="6"
          fill="#e8dcc7"
          stroke="#1c1a17"
          strokeWidth="3"
        />
        <rect x="16" y="16" width="218" height="148" fill="none" stroke="#c8baa6" strokeWidth="1" />

        {/* Certificate Header lines */}
        <line x1="50" y1="35" x2="200" y2="35" stroke="#1c1a17" strokeWidth="2.5" />
        <line x1="80" y1="45" x2="170" y2="45" stroke="#a69888" strokeWidth="1.5" />

        {/* Certificate Gold Seal */}
        <g id="seal" transform="translate(195, 120)">
          {/* Ribbon */}
          <polygon points="-8,10 -15,40 2,32" fill="#e05a47" stroke="#1c1a17" strokeWidth="1.5" />
          <polygon points="8,10 15,40 -2,32" fill="#e05a47" stroke="#1c1a17" strokeWidth="1.5" />
          {/* Gold Circle */}
          <circle cx="0" cy="10" r="16" fill="#e05a47" stroke="#1c1a17" strokeWidth="2" />
          <circle
            cx="0"
            cy="10"
            r="10"
            fill="none"
            stroke="#dfd1bc"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
        </g>

        {/* Text Details */}
        {isSIH && (
          <g>
            <text
              x="125"
              y="75"
              fill="#1c1a17"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              SIH 2025
            </text>
            <text
              x="125"
              y="95"
              fill="#5e574d"
              fontSize="9"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              NATIONAL FINALIST
            </text>
            <text
              x="125"
              y="110"
              fill="#a69888"
              fontSize="7"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Smart India Hackathon
            </text>
          </g>
        )}
        {isGSoC && (
          <g>
            <text
              x="125"
              y="75"
              fill="#1c1a17"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              GSoC 2024
            </text>
            <text
              x="125"
              y="95"
              fill="#5e574d"
              fontSize="9"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              CONTRIBUTOR
            </text>
            <text
              x="125"
              y="110"
              fill="#a69888"
              fontSize="7"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Google Summer of Code
            </text>
          </g>
        )}
        {isDevHack && (
          <g>
            <text
              x="125"
              y="75"
              fill="#1c1a17"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              DEVHACK '24
            </text>
            <text
              x="125"
              y="95"
              fill="#5e574d"
              fontSize="9"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              FIRST PLACE WINNER
            </text>
            <text
              x="125"
              y="110"
              fill="#a69888"
              fontSize="7"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              AI & Deep Learning Domain
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

interface PreloaderProps {
  onComplete?: () => void;
}

function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Preload hero images to prevent flash
    const images = [deskScene, deskSceneWave];
    let loadedCount = 0;
    let imagesLoaded = false;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          imagesLoaded = true;
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          imagesLoaded = true;
        }
      };
    });

    let current = 0;
    const interval = setInterval(() => {
      const step = Math.random() * 12 + 4;
      if (current < 90) {
        current += step;
      } else if (imagesLoaded || loadedCount >= images.length) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          if (onComplete) onComplete();
        }, 500);
      } else {
        current = 90;
      }
      setPercent(Math.min(100, Math.round(current)));
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Hexagon Outline */}
            <svg
              className="w-full h-full text-ink/10"
              viewBox="0 0 56 61"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M3 14 24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14"
              />
            </svg>
            {/* Hexagon Fill Mask */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(${100 - percent}% 0px 0px 0px)`,
                transition: "clip-path 0.08s linear",
              }}
            >
              <svg
                className="w-full h-full text-primary"
                viewBox="0 0 56 61"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M3 14 24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14"
                />
              </svg>
            </div>
            {/* Hexagon Text / Initials */}
            <span
              className="absolute font-mono text-xs font-bold text-ink"
              style={{ opacity: percent > 50 ? 1 : 0.4 }}
            >
              BM
            </span>
          </div>
          <div className="mt-4 font-mono text-sm tracking-widest text-muted-foreground">
            {percent}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type Category = "cs" | "tech" | "prof";

function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>("cs");
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  const current = hoveredCategory || activeCategory;

  const categories = [
    {
      id: "cs" as Category,
      title: "Computer Science",
      desc: "Core algorithms, artificial intelligence models, and system design paradigms.",
      accentClass: "text-[#e05a47] dark:text-[#f27a69]",
      borderClass: "border-[#e05a47] dark:border-[#f27a69]",
      bgClass: "bg-[#e05a47] dark:bg-[#f27a69]",
      bgLightClass: "bg-[#e05a47]/10 dark:bg-[#f27a69]/10",
      items: [
        { name: "Data Structures & Algos", level: 92 },
        { name: "Artificial Intelligence", level: 88 },
        { name: "System Design", level: 82 },
      ],
    },
    {
      id: "tech" as Category,
      title: "Tech Stack",
      desc: "Languages and frameworks used for deep learning and scalable web engineering.",
      accentClass: "text-[#2a3c3b] dark:text-[#a0c5c1]",
      borderClass: "border-[#2a3c3b] dark:border-[#a0c5c1]",
      bgClass: "bg-[#2a3c3b] dark:bg-[#a0c5c1]",
      bgLightClass: "bg-[#2a3c3b]/10 dark:bg-[#a0c5c1]/10",
      items: [
        { name: "React / TypeScript", level: 90 },
        { name: "Python / PyTorch", level: 86 },
        { name: "C / C++", level: 82 },
      ],
    },
    {
      id: "prof" as Category,
      title: "Professional",
      desc: "Critical thinking, agile team collaboration, and technical communication.",
      accentClass: "text-[#b48b5c] dark:text-[#dfb17d]",
      borderClass: "border-[#b48b5c] dark:border-[#dfb17d]",
      bgClass: "bg-[#b48b5c] dark:bg-[#dfb17d]",
      bgLightClass: "bg-[#b48b5c]/10 dark:bg-[#dfb17d]/10",
      items: [
        { name: "Problem Solving", level: 95 },
        { name: "Team Collaboration", level: 92 },
        { name: "Technical Writing", level: 85 },
      ],
    },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Interactive Mannequin Card */}
      <div className="lg:col-span-5 card-cream ring-cream p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[550px] lg:min-h-[580px]">
        {/* Glow Effects behind the mannequin */}
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 transition-colors duration-500">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl transition-all duration-500 ${
              current === "cs"
                ? "bg-[#e05a47]"
                : current === "tech"
                  ? "bg-[#2a3c3b]"
                  : "bg-[#b48b5c]"
            }`}
          />
        </div>

        {/* Floating Guide Label */}
        <div className="absolute top-4 left-4 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          Interactive Dummy
        </div>

        {/* SVG Mannequin */}
        <div className="w-full flex justify-center py-4">
          <svg viewBox="0 0 320 400" className="w-full h-auto max-w-[260px] overflow-visible">
            <defs>
              <filter id="glow-filter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* 3D Claymorphic gradients */}
              <radialGradient id="head-clay-grad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffebd6" />
                <stop offset="55%" stopColor="#ecd0be" />
                <stop offset="100%" stopColor="#c5997e" />
              </radialGradient>
              <linearGradient id="hair-clay-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8c5836" />
                <stop offset="60%" stopColor="#5d3920" />
                <stop offset="100%" stopColor="#331c0e" />
              </linearGradient>
              <radialGradient id="shirt-clay-grad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#6b6b70" />
                <stop offset="65%" stopColor="#3c3c40" />
                <stop offset="100%" stopColor="#1e1e20" />
              </radialGradient>
              <linearGradient id="pants-clay-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#333336" />
                <stop offset="85%" stopColor="#1b1b1c" />
                <stop offset="100%" stopColor="#0d0d0e" />
              </linearGradient>
              <radialGradient id="arm-clay-grad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffebd6" />
                <stop offset="65%" stopColor="#ecd0be" />
                <stop offset="100%" stopColor="#bd9379" />
              </radialGradient>
              <radialGradient id="sleeve-clay-grad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#6b6b70" />
                <stop offset="100%" stopColor="#1e1e20" />
              </radialGradient>
              <linearGradient id="shoe-clay-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="80%" stopColor="#e5e5ea" />
                <stop offset="100%" stopColor="#b5b5b9" />
              </linearGradient>
            </defs>

            {/* Tech Grid Background lines */}
            <g opacity="0.08" className="text-foreground">
              <line
                x1="160"
                y1="0"
                x2="160"
                y2="400"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="200"
                x2="320"
                y2="200"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx="160"
                cy="180"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="1 5"
              />
              <circle
                cx="160"
                cy="180"
                r="140"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 8"
              />
            </g>

            {/* Character Base: Sneakers Drop Shadow */}
            <ellipse cx="160" cy="372" rx="58" ry="8" fill="#1c1a17" fillOpacity="0.12" />

            {/* Neutral Base: Pants & Legs (Non-interactive) */}
            <g id="character-legs">
              {/* Left leg */}
              <path
                d="M 136 215 L 136 335"
                fill="none"
                stroke="#2a2a2d"
                strokeWidth="20"
                strokeLinecap="round"
              />
              {/* Right leg */}
              <path
                d="M 184 215 L 184 335"
                fill="none"
                stroke="#2a2a2d"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Trousers Bottom Cuffs */}
              <rect x="124" y="324" width="24" height="12" rx="4" fill="#2d2d30" />
              <rect x="172" y="324" width="24" height="12" rx="4" fill="#2d2d30" />

              {/* White sneakers with soft grey soles */}
              {/* Left Shoe */}
              <ellipse cx="136" cy="354" rx="16" ry="12" fill="url(#shoe-clay-grad)" />
              <path d="M 120 356 C 120 364, 152 364, 152 356 Z" fill="#3a3a3c" />
              <path d="M 121 349 Q 136 343 151 349" fill="none" stroke="#a1a1aa" strokeWidth="2" />

              {/* Right Shoe */}
              <ellipse cx="184" cy="354" rx="16" ry="12" fill="url(#shoe-clay-grad)" />
              <path d="M 168 356 C 168 364, 200 364, 200 356 Z" fill="#3a3a3c" />
              <path d="M 169 349 Q 184 343 199 349" fill="none" stroke="#a1a1aa" strokeWidth="2" />
            </g>

            {/* HEAD & FACE (CS Core) */}
            <motion.g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredCategory("cs")}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory("cs")}
              whileHover={{ scale: 1.06, originX: "160px", originY: "110px" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Invisible touch helper */}
              <circle cx="160" cy="110" r="48" fill="transparent" />

              {/* Neck */}
              <rect x="150" y="140" width="20" height="22" rx="3" fill="url(#head-clay-grad)" />

              {/* Face Base */}
              <circle
                cx="160"
                cy="110"
                r="36"
                fill="url(#head-clay-grad)"
                stroke={current === "cs" ? "#e05a47" : "none"}
                strokeWidth="2.5"
                filter={current === "cs" ? "url(#glow-filter)" : ""}
                className="transition-all duration-300"
              />

              {/* Sideburns */}
              <path
                d="M 124 105 C 120 120, 126 130, 134 133"
                fill="none"
                stroke="url(#hair-clay-grad)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 196 105 C 200 120, 194 130, 186 133"
                fill="none"
                stroke="url(#hair-clay-grad)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Hair - Brown volumetric clay quiff/sweep */}
              <path
                d="M 124 105 C 120 65, 175 48, 198 84 C 206 98, 201 124, 196 128 C 187 122, 184 108, 168 112 C 150 117, 132 118, 124 105 Z"
                fill="url(#hair-clay-grad)"
                stroke={current === "cs" ? "#e05a47" : "none"}
                strokeWidth="2"
                filter={current === "cs" ? "url(#glow-filter)" : ""}
                className="transition-all duration-300"
              />

              {/* Big Clay Eyes */}
              <g id="eyes">
                {/* Left Eye */}
                <circle cx="144" cy="112" r="7.5" fill="#2c1a11" />
                <circle cx="141.5" cy="109.5" r="2.2" fill="#ffffff" />
                <circle cx="146.2" cy="114.5" r="0.9" fill="#ffffff" />

                {/* Right Eye */}
                <circle cx="176" cy="112" r="7.5" fill="#2c1a11" />
                <circle cx="173.5" cy="109.5" r="2.2" fill="#ffffff" />
                <circle cx="178.2" cy="114.5" r="0.9" fill="#ffffff" />
              </g>

              {/* Rosy blush */}
              <circle cx="134" cy="122" r="4.5" fill="#f29c91" opacity="0.35" />
              <circle cx="186" cy="122" r="4.5" fill="#f29c91" opacity="0.35" />

              {/* Mouth smile (friendly curve) */}
              <path
                d="M 152 126 Q 160 132 168 126"
                fill="none"
                stroke="#2c1a11"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Interactive Laser pointer line pointing to right side */}
              <line
                x1="196"
                y1="110"
                x2="255"
                y2="90"
                className={`transition-all duration-300 ${
                  current === "cs"
                    ? "text-[#e05a47] dark:text-[#f27a69] opacity-100"
                    : "text-transparent opacity-0"
                }`}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx="255"
                cy="90"
                r="3.5"
                className={`transition-all duration-300 ${
                  current === "cs"
                    ? "text-[#e05a47] dark:text-[#f27a69] opacity-100"
                    : "text-transparent opacity-0"
                }`}
                fill="currentColor"
              />
            </motion.g>

            {/* TORSO / CHEST (Professional Competencies) */}
            <motion.g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredCategory("prof")}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory("prof")}
              whileHover={{ scale: 1.04, originX: "160px", originY: "188px" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Invisible touch helper */}
              <rect x="120" y="155" width="80" height="70" fill="transparent" />

              {/* Torso/Chest outline (Dark Gray T-shirt) */}
              <path
                d="M 124 162 C 124 162, 130 155, 140 155 L 180 155 C 190 155, 196 162, 196 162 L 190 220 C 190 220, 160 225, 130 220 Z"
                fill="url(#shirt-clay-grad)"
                stroke={current === "prof" ? "#b48b5c" : "none"}
                strokeWidth="2.5"
                filter={current === "prof" ? "url(#glow-filter)" : ""}
                className="transition-all duration-300"
              />

              {/* Heart/Energy Core Indicator */}
              <circle
                cx="160"
                cy="188"
                r={current === "prof" ? "8" : "5"}
                className={`transition-all duration-300 ${
                  current === "prof"
                    ? "text-[#b48b5c] dark:text-[#dfb17d] animate-pulse"
                    : "text-[#5c5c60]/40"
                }`}
                fill="currentColor"
              />

              {/* Interactive Laser pointer line pointing to left side */}
              <line
                x1="125"
                y1="188"
                x2="65"
                y2="188"
                className={`transition-all duration-300 ${
                  current === "prof"
                    ? "text-[#b48b5c] dark:text-[#dfb17d] opacity-100"
                    : "text-transparent opacity-0"
                }`}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx="65"
                cy="188"
                r="3.5"
                className={`transition-all duration-300 ${
                  current === "prof"
                    ? "text-[#b48b5c] dark:text-[#dfb17d] opacity-100"
                    : "text-transparent opacity-0"
                }`}
                fill="currentColor"
              />
            </motion.g>

            {/* CROSSED ARMS (Tech Stack) */}
            <motion.g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredCategory("tech")}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory("tech")}
              whileHover={{ scale: 1.05, originX: "160px", originY: "185px" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Invisible touch helper */}
              <rect x="110" y="155" width="100" height="70" fill="transparent" />

              {/* Sleeves */}
              {/* Left Sleeve */}
              <ellipse
                cx="120"
                cy="172"
                rx="10"
                ry="12"
                fill="url(#sleeve-clay-grad)"
                transform="rotate(-15, 120, 172)"
              />
              {/* Right Sleeve */}
              <ellipse
                cx="200"
                cy="172"
                rx="10"
                ry="12"
                fill="url(#sleeve-clay-grad)"
                transform="rotate(15, 200, 172)"
              />

              {/* Crossed Forearms with glow indicators */}
              {/* Under arm glow backplate */}
              <path
                d="M 120 178 Q 140 215 185 200"
                fill="none"
                stroke="#2a3c3b"
                strokeWidth="20"
                strokeLinecap="round"
                opacity={current === "tech" ? 0.85 : 0}
                filter="url(#glow-filter)"
                className="transition-all duration-300"
              />
              {/* Under arm main */}
              <path
                d="M 120 178 Q 140 215 185 200"
                fill="none"
                stroke="url(#arm-clay-grad)"
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* Top arm glow backplate */}
              <path
                d="M 200 178 Q 180 215 135 200"
                fill="none"
                stroke="#2a3c3b"
                strokeWidth="20"
                strokeLinecap="round"
                opacity={current === "tech" ? 0.85 : 0}
                filter="url(#glow-filter)"
                className="transition-all duration-300"
              />
              {/* Top arm main */}
              <path
                d="M 200 178 Q 180 215 135 200"
                fill="none"
                stroke="url(#arm-clay-grad)"
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* Hands detail */}
              <circle cx="185" cy="200" r="7.5" fill="url(#arm-clay-grad)" />
              <circle cx="135" cy="200" r="7.5" fill="url(#arm-clay-grad)" />

              {/* Interactive Laser pointer line pointing to right/bottom side */}
              <line
                x1="200"
                y1="190"
                x2="265"
                y2="210"
                className={`transition-all duration-300 ${
                  current === "tech"
                    ? "text-[#2a3c3b] dark:text-[#a0c5c1] opacity-100"
                    : "text-transparent opacity-0"
                }`}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx="265"
                cy="210"
                r="3.5"
                className={`transition-all duration-300 ${
                  current === "tech"
                    ? "text-[#2a3c3b] dark:text-[#a0c5c1] opacity-100"
                    : "text-transparent opacity-0"
                }`}
                fill="currentColor"
              />
            </motion.g>
          </svg>
        </div>

        {/* Helper instructions text */}
        <div className="mt-4 text-center px-4">
          <p className="font-mono text-xs text-muted-foreground transition-all duration-300 h-8">
            {current === "cs" && "💡 Head hover active: Computer Science Core"}
            {current === "tech" && "🛠️ Arms hover active: Tech Stack (Languages & Frameworks)"}
            {current === "prof" && "🌟 Chest hover active: Professional Competencies"}
            {!hoveredCategory && "👋 Hover or tap parts of the mannequin to filter skills"}
          </p>
          <div className="flex gap-2 justify-center mt-3 flex-wrap">
            <button
              onClick={() => setActiveCategory("cs")}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-full border transition-all duration-200 ${
                activeCategory === "cs"
                  ? "bg-[#e05a47]/10 border-[#e05a47] text-[#e05a47] dark:text-[#f27a69] dark:border-[#f27a69]"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Head (CS)
            </button>
            <button
              onClick={() => setActiveCategory("tech")}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-full border transition-all duration-200 ${
                activeCategory === "tech"
                  ? "bg-[#2a3c3b]/10 border-[#2a3c3b] text-[#2a3c3b] dark:text-[#a0c5c1] dark:border-[#a0c5c1]"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Arms (Tech)
            </button>
            <button
              onClick={() => setActiveCategory("prof")}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-full border transition-all duration-200 ${
                activeCategory === "prof"
                  ? "bg-[#b48b5c]/10 border-[#b48b5c] text-[#b48b5c] dark:text-[#dfb17d] dark:border-[#dfb17d]"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Chest (Prof)
            </button>
          </div>
        </div>
      </div>

      {/* Skill Cards Columns */}
      <div className="lg:col-span-7 space-y-6">
        {categories.map((cat) => {
          const isHighlighted = current === cat.id;
          return (
            <motion.div
              key={cat.id}
              className={`card-cream ring-cream p-6 transition-all duration-300 border-2 cursor-pointer ${
                isHighlighted
                  ? `${cat.borderClass} translate-x-1 shadow-lg bg-cream-dark/20 dark:bg-cream-dark/10`
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              onMouseEnter={() => setHoveredCategory(cat.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory(cat.id)}
              layout
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`text-display text-2xl transition-colors duration-300 ${isHighlighted ? cat.accentClass : "text-foreground"}`}
                >
                  {cat.title}
                </h3>
                {isHighlighted && (
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded-full ${cat.bgLightClass} ${cat.accentClass}`}
                  >
                    Active Focus
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-5 font-sans">{cat.desc}</p>

              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span>{item.name}</span>
                      <span className={isHighlighted ? cat.accentClass : "text-muted-foreground"}>
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary/60 dark:bg-secondary/20 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full transition-all duration-500 ${isHighlighted ? cat.bgClass : "bg-ink/60 dark:bg-cream-dark/60"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Portfolio() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [isWaving, setIsWaving] = useState(true);

  useEffect(() => {
    if (!preloaderFinished) return;
    const timer = setTimeout(() => {
      setIsWaving(false);
    }, 2800); // Waving for 2.8s after preloader finishes
    return () => clearTimeout(timer);
  }, [preloaderFinished]);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsIn, setStatsIn] = useState(false);
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStatsIn(true), {
      threshold: 0.4,
    });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Global scroll-reveal for [data-reveal] elements
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Hero 3D scroll scene
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.4 });
  // Immersive 3D Scroll transformations
  const sceneRotY = useTransform(sp, [0, 1], [-18, 32]);
  const sceneRotX = useTransform(sp, [0, 1], [12, -6]);
  const sceneY = useTransform(sp, [0, 1], [0, -140]);
  const sceneScale = useTransform(sp, [0, 1], [1, 0.82]);
  const sceneTranslateZ = useTransform(sp, [0, 1], [0, 180]);
  const sceneTranslateX = useTransform(sp, [0, 1], [0, -40]);

  const headlineX = useTransform(sp, [0, 1], [0, -80]);
  const headlineY = useTransform(sp, [0, 1], [0, -120]);
  const headlineZ = useTransform(sp, [0, 1], [0, 320]);
  const headlineRotY = useTransform(sp, [0, 1], [0, -20]);
  const headlineOpacity = useTransform(sp, [0, 0.7], [1, 0]);
  const tagRot = useTransform(sp, [0, 1], [-4, -14]);

  const chip1Z = useTransform(sp, [0, 1], [80, 320]);
  const chip2Z = useTransform(sp, [0, 1], [100, 360]);
  const chip3Z = useTransform(sp, [0, 1], [60, 260]);

  // Floor grid animations
  const gridRotX = useTransform(sp, [0, 1], [65, 48]);
  const gridY = useTransform(sp, [0, 1], [120, -60]);
  const gridScale = useTransform(sp, [0, 1], [1, 1.35]);

  // Cursor parallax on the scene
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Preloader onComplete={() => setPreloaderFinished(true)} />
      {/* Nav */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav className="pill-nav shadow-sm backdrop-blur">
          <a href="#about">ABOUT</a>
          <a href="#projects">PROJECTS</a>
          <a href="#achievements">AWARDS</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <a
          href="#contact"
          className="btn-orange ml-auto hidden md:inline-flex items-center absolute right-6 top-4"
        >
          GET IN TOUCH
        </a>
      </motion.header>

      {/* Hero with 3D scroll scene */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
          setMouse({
            x: ((e.clientX - r.left) / r.width - 0.5) * 2,
            y: ((e.clientY - r.top) / r.height - 0.5) * 2,
          });
        }}
        className="relative min-h-screen flex items-center px-6 md:px-16 pt-32 pb-20 overflow-hidden"
        style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
      >
        {/* 3D Perspective Grid Background */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 dark:opacity-[0.08]"
          style={{
            perspective: "1400px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[70vh] origin-bottom"
            style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center bottom",
              rotateX: gridRotX,
              y: gridY,
              scale: gridScale,
              z: -400,
            }}
          />
        </motion.div>

        {/* Soft floating blobs */}
        <motion.div
          aria-hidden
          className="absolute top-24 left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-tag/15 blur-3xl pointer-events-none"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div 
          className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            style={{ 
              x: headlineX, 
              y: headlineY,
              z: headlineZ,
              rotateY: headlineRotY,
              opacity: headlineOpacity,
              transformStyle: "preserve-3d"
            }}
          >
            <motion.h1
              className="text-display text-5xl md:text-[7.5rem] leading-[0.85]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.span
                className="block"
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Bhavyansh
              </motion.span>
              <motion.span
                className="block"
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                Mehta
              </motion.span>
            </motion.h1>
            <motion.div
              className="mt-6 flex flex-wrap gap-3 items-center"
              {...onView}
              variants={reveal}
            >
              <motion.span className="tag-skew" style={{ rotate: tagRot }}>
                B.TECH CSE · 3RD YEAR
              </motion.span>
              <span className="font-mono text-sm text-muted-foreground">
                JECRC University, Jaipur
              </span>
            </motion.div>
            <motion.p
              className="mt-8 max-w-md text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Passionate about building intelligent autonomous systems, scalable backend
              architectures, and developer tools. Exploring AI, aviation software, and full-stack
              systems.
            </motion.p>
            <motion.div
              className="mt-10 flex gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a href="#projects" className="btn-orange">
                SEE MY WORK
              </a>
              <a
                href="#contact"
                className="font-mono text-sm font-bold underline underline-offset-4"
              >
                SAY HELLO →
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Desk Scene */}
          <motion.div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              rotateY: sceneRotY,
              rotateX: sceneRotX,
              z: sceneTranslateZ,
              x: sceneTranslateX,
              y: sceneY,
              scale: sceneScale,
            }}
          >
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Waving Image */}
              <motion.img
                src={deskSceneWave}
                alt="3D illustration of student waving hello"
                width={1024}
                height={1024}
                className="absolute inset-0 w-full h-full drop-shadow-2xl object-contain"
                style={{
                  rotateY: mouse.x * 8,
                  rotateX: -mouse.y * 6,
                  translateZ: 40,
                }}
                animate={{ opacity: isWaving ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              {/* Coding Image */}
              <motion.img
                src={deskScene}
                alt="3D illustration of student coding at desk"
                width={1024}
                height={1024}
                className="absolute inset-0 w-full h-full drop-shadow-2xl object-contain"
                style={{
                  rotateY: mouse.x * 8,
                  rotateX: -mouse.y * 6,
                  translateZ: 40,
                }}
                animate={{ opacity: isWaving ? 0 : 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            {/* Floating chips */}
            <motion.div
              className="absolute -top-2 -right-2 md:right-6 bg-card ring-cream rounded-2xl px-4 py-2 font-mono text-xs shadow-lg"
              animate={{ y: [0, -10, 0], rotate: [3, 6, 3] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ z: chip1Z }}
            >
              {"<code/>"} 12 PROJECTS
            </motion.div>
            <motion.div
              className="absolute -bottom-2 left-0 bg-tag text-tag-foreground rounded-2xl p-4 rotate-[-6deg] shadow-lg"
              animate={{ y: [0, 8, 0], rotate: [-6, -3, -6] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ z: chip2Z }}
            >
              <div className="font-mono text-[10px]">CAREER GOAL</div>
              <div className="text-display text-lg">AI & SYSTEMS ENGINEER</div>
            </motion.div>
            <motion.div
              className="absolute top-1/3 -left-4 bg-primary text-primary-foreground rounded-xl px-3 py-2 font-mono text-xs shadow-lg"
              animate={{ y: [0, 12, 0], rotate: [-4, -8, -4] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              style={{ z: chip3Z }}
            >
              🚀 DEVELOPER
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ↓ SCROLL
        </motion.div>
      </section>

      {/* Marquee band */}
      <div className="overflow-hidden bg-ink text-cream py-6 border-y border-ink">
        <div className="flex gap-12 whitespace-nowrap animate-marquee text-display text-3xl md:text-5xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0 items-center">
              <span>ARTIFICIAL INTELLIGENCE</span>
              <span className="text-primary">✦</span>
              <span>FULL STACK DEV</span>
              <span className="text-primary">✦</span>
              <span>ROBOTICS</span>
              <span className="text-primary">✦</span>
              <span>DISTRIBUTED SYSTEMS</span>
              <span className="text-primary">✦</span>
              <span>SYSTEM DESIGN</span>
              <span className="text-primary">✦</span>
              <span>MACHINE LEARNING</span>
              <span className="text-primary">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section ref={statsRef} className="px-6 md:px-16 py-20 border-y border-border">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10"
          {...onView}
          variants={stagger}
        >
          {[
            { v: 8.76, s: "", l: "CGPA (Out of 10)" },
            { v: 12, s: "+", l: "Projects Completed" },
            { v: 3, s: "rd Year", l: "B.Tech CSE Student" },
            { v: 500, s: "+", l: "DSA Problems Solved" },
          ].map((s) => (
            <motion.div key={s.l} variants={reveal}>
              <Stat value={s.v} suffix={s.s} label={s.l} start={statsIn} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="px-6 md:px-16 py-28 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            01 — ABOUT
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 data-reveal className="text-display text-5xl md:text-7xl">
              Building systems
              <br />
              with <span className="text-primary">precision.</span>
            </h2>
            <p className="mt-8 text-lg max-w-2xl text-muted-foreground">
              I am a Computer Science student who loves diving into low-level systems, designing
              machine learning models, and compiling efficient software stacks. Whether it's coding
              autonomous drone flight simulators or building robust web services, I'm always looking
              for hard technical puzzles to solve.
            </p>
          </div>
          <div className="space-y-4">
            <VectorAvatar />
            <div className="card-cream ring-cream p-6 space-y-3 font-mono text-sm">
              <InfoRow k="FULL NAME" v="Bhavyansh Mehta" />
              <InfoRow k="DATE OF BIRTH" v="26 May 2005" />
              <InfoRow k="DEGREE" v="B.Tech CSE" />
              <InfoRow k="UNIVERSITY" v="JECRC University" />
              <InfoRow k="CITY" v="Jaipur, India" />
              <InfoRow k="GOAL" v="AI & Systems Engineer" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {[
            "Python",
            "C++",
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Machine Learning",
            "Docker",
            "Algorithms",
          ].map((i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-mono text-sm"
            >
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* Academic Performance */}
      <section className="px-6 md:px-16 py-28 bg-cream-dark/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs tracking-widest text-muted-foreground">
              02 — ACADEMICS
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 data-reveal className="text-display text-5xl md:text-6xl mb-12">
            Report card.
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="card-cream ring-cream overflow-hidden">
              {[
                ["Data Structures & Algorithms", "A+"],
                ["Database Management Systems", "A"],
                ["Artificial Intelligence & ML", "A+"],
                ["Computer Networks", "A"],
                ["Operating Systems", "A"],
              ].map(([s, g]) => (
                <div
                  key={s}
                  className="flex justify-between items-center px-6 py-5 border-b border-border last:border-0"
                >
                  <span className="font-medium">{s}</span>
                  <span className="text-display text-2xl text-primary">{g}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-display text-[8rem] leading-none text-primary">8.76</div>
              <p className="font-mono text-sm text-muted-foreground mt-2">
                CUMULATIVE GPA · JECRC UNIVERSITY
              </p>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                Strong academic record in core Computer Science courses. Specialized in design and
                analysis of algorithms, data modeling, and neural network foundations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Societies */}
      <section className="px-6 md:px-16 py-28 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            03 — SOCIETIES
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <h2 data-reveal className="text-display text-5xl md:text-6xl mb-12">
          Where I contribute.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Technical Coding Society",
              meta: "Lead developer & problem setter for campus coding contests",
            },
            {
              name: "AI & Robotics Club",
              meta: "Core member developing autonomous drone systems and navigation packages",
            },
            {
              name: "Web Development Cell",
              meta: "Contributed to JECRC's student utility portal and event sites",
            },
            {
              name: "Open Source Group",
              meta: "Active contributor to GitHub library issues and tools",
            },
            {
              name: "IEEE Student Branch",
              meta: "Organized and spoke at workshops on deep learning and system software",
            },
            {
              name: "Competitive Programming",
              meta: "Solved 500+ algorithmic challenges on LeetCode/CodeChef",
            },
          ].map((c, i) => (
            <div
              key={c.name}
              className={`card-cream ring-cream p-7 hover:-translate-y-1 transition-transform ${i === 0 ? "bg-primary text-primary-foreground ring-0" : ""}`}
            >
              <div className="font-mono text-xs opacity-70">
                SOCIETY {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-display text-2xl mt-3">{c.name}</div>
              <div className="mt-4 text-sm opacity-80">{c.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 md:px-16 py-28 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            05 — PROJECTS
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <h2 data-reveal className="text-display text-5xl md:text-7xl mb-4">
          Things I've <span className="text-primary">built.</span>
        </h2>
        <p className="text-muted-foreground max-w-md mb-12">
          A collection of systems, AI models, and full-stack software.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              t: "Aero AI",
              d: "AI-driven autonomous flight simulation and path planning using deep reinforcement learning and computer vision. Tested on custom quadcopters.",
              tag: "AI & ROBOTICS",
              url: "https://my-chatgpt-clone.onrender.com",
            },
            {
              t: "Stax Framework",
              d: "A high-performance full-stack web framework and state-management system optimized for server-side rendering and static compilation.",
              tag: "SYSTEM SOFTWARE",
              url: "https://stax-burger.vercel.app",
            },
          ].map((p) => (
            <a
              key={p.t}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-cream ring-cream overflow-hidden group block hover:no-underline cursor-pointer transition-transform hover:-translate-y-1"
            >
              <ProjectGraphic title={p.t} tag={p.tag} heightClass="h-72" />
              <div className="p-6">
                <span className="tag-skew text-[10px]">{p.tag}</span>
                <h3 data-reveal className="text-display text-2xl mt-4">
                  {p.t}
                </h3>
                <p className="mt-2 text-muted-foreground">{p.d}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-16 py-28 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            07 — SKILLS
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <h2 data-reveal className="text-display text-5xl md:text-6xl mb-12">
          What I'm good at.
        </h2>
        <SkillsShowcase />
      </section>

      {/* Blog */}
      <section className="px-6 md:px-16 py-28 bg-cream-dark/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs tracking-widest text-muted-foreground">
              08 — JOURNAL
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 data-reveal className="text-display text-5xl md:text-6xl mb-12">
            From the blog.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                d: "Mar 2026",
                t: "Building Aero AI: RL in Flight Simulators",
                e: "Exploring deep Q-networks and policy gradients to train autonomous UAV models in virtual simulation environments.",
              },
              {
                d: "Dec 2025",
                t: "Inside Stax: High-Concurrency Routing",
                e: "How I optimized regex path matching to build a reactive micro-framework that outperforms node's HTTP defaults.",
              },
              {
                d: "Oct 2025",
                t: "My GSoC Journey: Open Source at Scale",
                e: "Key insights on asynchronous codebase contribution, remote team review processes, and refactoring testing patterns.",
              },
            ].map((b) => (
              <article
                key={b.t}
                className="card-cream ring-cream p-7 hover:-translate-y-1 transition-transform"
              >
                <div className="font-mono text-xs text-muted-foreground">{b.d}</div>
                <h3 data-reveal className="text-display text-2xl mt-3">
                  {b.t}
                </h3>
                <p className="mt-3 text-muted-foreground">{b.e}</p>
                <div className="mt-5 font-mono text-xs font-bold">READ MORE →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Bhavyansh is an exceptionally detail-oriented engineer. His work on Aero AI showed a deep grasp of neural networks and aerial dynamics.",
              a: "Dr. Amit S.",
              r: "Project Supervisor",
            },
            {
              q: "A solid developer who always builds with the future stack in mind. Stax represents outstanding implementation of modern web routing.",
              a: "Prof. Neha R.",
              r: "Computer Science Dept",
            },
          ].map((t) => (
            <blockquote key={t.a} className="card-cream ring-cream p-8">
              <div className="text-display text-6xl text-primary leading-none">"</div>
              <p className="text-xl mt-2">{t.q}</p>
              <footer className="mt-6 font-mono text-sm">
                <span className="font-bold">{t.a}</span> ·{" "}
                <span className="text-muted-foreground">{t.r}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-16 py-28 bg-ink text-cream">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-mono text-xs tracking-widest opacity-60">09 — CONTACT</span>
          <h2 data-reveal className="text-display text-6xl md:text-[9rem] mt-4">
            Let's work
            <br />
            <span className="text-primary">together!</span>
          </h2>
          <p className="mt-8 text-lg opacity-80 max-w-xl mx-auto">
            Drop a note for software collaboration, engineering projects, or a chat about robotics
            and developer stacks.
          </p>
          <a href="mailto:bhavyanshmehta2605@gmail.com" className="btn-orange mt-10 inline-flex">
            bhavyanshmehta2605@gmail.com
          </a>
          <form className="mt-14 grid md:grid-cols-2 gap-4 text-left">
            <input
              className="bg-cream/10 border border-cream/20 rounded-xl px-5 py-4 placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
            <input
              className="bg-cream/10 border border-cream/20 rounded-xl px-5 py-4 placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
              type="email"
            />
            <textarea
              rows={4}
              className="md:col-span-2 bg-cream/10 border border-cream/20 rounded-xl px-5 py-4 placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Message"
            />
            <button type="button" className="btn-orange md:col-span-2 justify-self-start">
              SEND MESSAGE →
            </button>
          </form>
        </div>
      </section>

      <footer className="px-6 md:px-16 py-10 bg-ink text-cream/60 border-t border-cream/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-4 font-mono text-xs">
          <span>© 2026 BHAVYANSH MEHTA · BUILT FOR CSE PORTFOLIO</span>
          <span>JAIPUR, INDIA</span>
        </div>
      </footer>
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
      <span className="text-muted-foreground text-xs uppercase tracking-widest">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}
