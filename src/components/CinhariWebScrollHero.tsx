import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CinhariWebScrollHeroProps {
  onDonateClick?: () => void;
  onSurveyClick?: () => void;
  onResourcesClick?: () => void;
  onCrisisClick?: () => void;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const HEART_PATH =
  "M50,28 C50,17 40,5 27,10 C12,15 8,32 8,42 C8,62 28,74 50,90 C72,74 92,62 92,42 C92,32 88,15 73,10 C60,5 50,17 50,28 Z";

function Heart({
  id,
  topColor,
  midColor,
  bottomColor,
}: {
  id: string;
  topColor: string;
  midColor: string;
  bottomColor: string;
}) {
  return (
    <svg
      viewBox="0 0 100 95"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient
          id={id}
          cx="48%"
          cy="28%"
          r="62%"
        >
          <stop offset="0%" stopColor={topColor} />
          <stop offset="55%" stopColor={midColor} />
          <stop offset="100%" stopColor={bottomColor} />
        </radialGradient>
        <radialGradient id={`${id}-gloss`} cx="38%" cy="18%" r="38%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <path d={HEART_PATH} fill={`url(#${id})`} />
      <path d={HEART_PATH} fill={`url(#${id}-gloss)`} />
    </svg>
  );
}

export const CinhariWebScrollHero: React.FC<CinhariWebScrollHeroProps> = () => {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      setProgress(Math.min(1, scrolled / scrollable));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const p = easeInOutCubic(progress);

  // Transition from Deep Navy Blue to White (Esperanza):
  const bgR = Math.round(lerp(12, 255, p));
  const bgG = Math.round(lerp(36, 255, p));
  const bgB = Math.round(lerp(74, 255, p));
  const bg = `rgb(${bgR},${bgG},${bgB})`;

  // Responsive scale for hearts
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const SIZE = isMobile ? 150 : 220;
  const spreadFactor = isMobile ? 0.62 : 1.0;

  // Left cyan — moves right and slightly up
  const lx = lerp(-252 * spreadFactor, -48 * spreadFactor, p);
  const ly = lerp(0, -28 * spreadFactor, p);
  const ls = lerp(1, 0.91, p);

  // Right cyan — mirror
  const rx = lerp(252 * spreadFactor, 48 * spreadFactor, p);
  const ry = lerp(0, -28 * spreadFactor, p);
  const rs = lerp(1, 0.91, p);

  // Center blue — stays, scales forward, lifts slightly
  const cs = lerp(1, 1.13, p);
  const cly = lerp(0, -14 * spreadFactor, p);

  // Radiance Glow
  const glowPx = lerp(15, 60, p);

  return (
    <div id="inicio" ref={containerRef} style={{ height: "300vh", background: bg }} className="relative transition-colors duration-100">
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
        className="w-full px-4 sm:px-6 lg:px-8 pt-20 pb-8 select-none"
      >
        {/* Radiance of Hope */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: lerp(0.4, 0.95, p),
            background: p < 0.6
              ? `
                radial-gradient(ellipse 60% 45% at 15% 70%, rgba(0, 225, 255, 0.28) 0%, transparent 65%),
                radial-gradient(ellipse 60% 45% at 85% 70%, rgba(0, 225, 255, 0.28) 0%, transparent 65%),
                radial-gradient(ellipse 35% 30% at 50% 50%, rgba(18, 110, 220, 0.25) 0%, transparent 60%)
              `
              : `
                radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0, 200, 245, 0.22) 0%, transparent 70%),
                radial-gradient(ellipse 90% 50% at 50% 90%, rgba(220, 245, 255, 0.6) 0%, transparent 80%)
              `,
            pointerEvents: "none",
          }}
        />

        {/* Top Header Text Overlay */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center mt-2 sm:mt-4 pointer-events-none">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold tracking-wide transition-colors duration-300 shadow-xs"
            style={{
              backgroundColor: p < 0.5 ? 'rgba(0, 225, 255, 0.12)' : 'rgba(255, 255, 255, 0.92)',
              borderColor: p < 0.5 ? 'rgba(0, 225, 255, 0.35)' : 'rgba(0, 163, 204, 0.3)',
              color: p < 0.5 ? '#67e8f9' : '#083e58',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Fundación CINHARI · Fusagasugá & Soacha</span>
            <span className="opacity-40">|</span>
            <span className="font-bold">Salud Mental & Acompañamiento</span>
          </div>

          <p
            className="mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight transition-colors duration-300 leading-tight"
            style={{ color: p < 0.5 ? '#ffffff' : '#063852' }}
          >
            {p < 0.5 ? (
              <>
                Del proceso interior a la <span className="text-cyan-400 font-black">luz de la esperanza</span>
              </>
            ) : (
              <>
                Unidos en un solo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3CC] via-[#00c8f5] to-[#0a4d6e]">emblema de vida</span>
              </>
            )}
          </p>
          
          <p
            className="mt-2 text-xs sm:text-sm md:text-base max-w-xl mx-auto transition-colors duration-300 font-medium"
            style={{ color: p < 0.5 ? '#94a3b8' : '#475569' }}
          >
            {p < 0.45
              ? "Haz scroll hacia abajo para iluminar el camino y presenciar la unión de nuestros corazones."
              : "Psicología especializada, evaluación neuropsicológica y apoyo comunitario integral."}
          </p>
        </div>

        {/* Center Stage: Three Hearts + Centered CINHARI Branding */}
        <div className="relative my-auto w-full flex flex-col items-center justify-center">
          {/* Three Hearts Container */}
          <div className="relative flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>
            {/* Left cyan heart */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${lx}px, ${ly}px) scale(${ls})`,
                zIndex: 1,
                willChange: "transform",
                filter: `drop-shadow(0 0 ${glowPx}px rgba(0, 215, 255, ${lerp(0.5, 0.75, p)}))`,
              }}
            >
              <Heart
                id="lH"
                topColor="#18F2FF"
                midColor="#00C8E8"
                bottomColor="#0098B8"
              />
            </div>

            {/* Right cyan heart */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${rx}px, ${ry}px) scale(${rs})`,
                zIndex: 2,
                willChange: "transform",
                filter: `drop-shadow(0 0 ${glowPx}px rgba(0, 215, 255, ${lerp(0.5, 0.75, p)}))`,
              }}
            >
              <Heart
                id="rH"
                topColor="#52EEFF"
                midColor="#1AD8F5"
                bottomColor="#00AECE"
              />
            </div>

            {/* Center dark blue heart */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(0px, ${cly}px) scale(${cs})`,
                zIndex: 3,
                willChange: "transform",
                filter: `drop-shadow(0 ${lerp(4, 16, p)}px ${lerp(12, 36, p)}px rgba(6, 56, 82, ${lerp(0.4, 0.28, p)}))`,
              }}
            >
              <Heart
                id="cH"
                topColor="#2470CC"
                midColor="#1250A8"
                bottomColor="#0A3278"
              />
            </div>
          </div>

          {/* CINHARI BRANDING PERFECTAMENTE CENTRADO */}
          <div
            className="w-full max-w-lg mx-auto text-center mt-6 transition-all duration-300 pointer-events-none flex flex-col items-center justify-center"
            style={{
              opacity: Math.max(0, (p - 0.45) / 0.55),
              transform: `translateY(${lerp(20, 0, Math.max(0, (p - 0.45) / 0.55))}px)`,
            }}
          >
            <span
              className="font-['Architects_Daughter'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-center block transition-colors duration-300 drop-shadow-sm"
              style={{
                color: p > 0.65 ? '#063852' : '#22d3ee',
              }}
            >
              CINHARI
            </span>
            <p
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase mt-1 text-center block transition-colors duration-300"
              style={{
                color: p > 0.65 ? '#007799' : '#a5f3fc',
              }}
            >
              {language === 'es' ? 'Psicología Especializada - Fusagasugá & Soacha' : 'Specialized Psychology - Fusagasugá & Soacha'}
            </p>
          </div>
        </div>

        {/* Bottom Section: Indicador sutil de scroll */}
        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center justify-center pb-2">
          <div
            style={{
              opacity: Math.max(0, 1 - p * 2),
              pointerEvents: "none",
            }}
            className="flex flex-col items-center gap-1.5 text-xs text-cyan-300 font-medium"
          >
            <div
              style={{
                width: 24,
                height: 38,
                borderRadius: 12,
                border: '2px solid rgba(0, 225, 255, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 6,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 8,
                  borderRadius: 2,
                  background: '#00e5ff',
                  animation: 'scrollDot 1.6s ease-in-out infinite',
                }}
              />
            </div>
            <span style={{ color: p > 0.5 ? '#0284c7' : '#67e8f9' }} className="font-semibold transition-colors duration-300">
              {language === 'es' ? 'Desliza para continuar' : 'Scroll down to explore'}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
