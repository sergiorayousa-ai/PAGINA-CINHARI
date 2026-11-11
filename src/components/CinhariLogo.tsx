import React from 'react';

interface CinhariLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'compact' | 'centered';
  theme?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
  showDetails?: boolean;
  customTagline?: string;
}

export const CinhariLogo: React.FC<CinhariLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'color',
  size = 'md',
  showTagline = true,
  showDetails = false,
  customTagline = 'Psicología Especializada - Bogotá - Soacha'
}) => {
  const sizeMap = {
    sm: { icon: 'w-9 h-9', title: 'text-lg sm:text-xl', subtitle: 'text-[10.5px]', details: 'text-[10px]' },
    md: { icon: 'w-12 h-12', title: 'text-2xl sm:text-3xl', subtitle: 'text-xs sm:text-sm', details: 'text-[11px]' },
    lg: { icon: 'w-20 h-20', title: 'text-3xl sm:text-4xl', subtitle: 'text-sm sm:text-base', details: 'text-xs sm:text-sm' },
    xl: { icon: 'w-28 h-28 sm:w-32 sm:h-32', title: 'text-4xl sm:text-5xl md:text-6xl', subtitle: 'text-base sm:text-lg', details: 'text-sm' },
    '2xl': { icon: 'w-40 h-40 sm:w-48 sm:h-48', title: 'text-5xl sm:text-6xl md:text-7xl', subtitle: 'text-lg sm:text-xl', details: 'text-base' }
  };

  const titleColors = {
    color: 'text-[#094a67]',
    light: 'text-white',
    dark: 'text-slate-800'
  };

  const subtitleColors = {
    color: 'text-[#094a67]',
    light: 'text-teal-100',
    dark: 'text-slate-600'
  };

  const detailColors = {
    color: 'text-slate-600',
    light: 'text-teal-200/90',
    dark: 'text-slate-600'
  };

  const isCentered = variant === 'centered';

  return (
    <div className={`select-none ${isCentered ? 'flex flex-col items-center text-center' : 'flex items-center gap-3'} ${className}`}>
      {/* Official Cinhari Multi-Layered Heart & Wings Blossom (Exact Match to Official Brand Vector) */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size].icon} ${isCentered ? 'mb-3' : ''}`}>
        <svg
          viewBox="0 0 360 250"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients matching the exact translucent cyan and blue ribbons */}
            <linearGradient id="gradOuterCyanLeft" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00c8f5" />
              <stop offset="60%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#33ebff" />
            </linearGradient>

            <linearGradient id="gradOuterCyanRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00c8f5" />
              <stop offset="60%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#33ebff" />
            </linearGradient>

            <linearGradient id="gradMidWingLeft" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00b4e6" />
              <stop offset="50%" stopColor="#00d5f8" />
              <stop offset="100%" stopColor="#60edff" />
            </linearGradient>

            <linearGradient id="gradMidWingRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00b4e6" />
              <stop offset="50%" stopColor="#00d5f8" />
              <stop offset="100%" stopColor="#60edff" />
            </linearGradient>

            <linearGradient id="gradInnerPetalLeft" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00779e" />
              <stop offset="60%" stopColor="#00a3cc" />
              <stop offset="100%" stopColor="#00c8eb" />
            </linearGradient>

            <linearGradient id="gradInnerPetalRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00779e" />
              <stop offset="60%" stopColor="#00a3cc" />
              <stop offset="100%" stopColor="#00c8eb" />
            </linearGradient>

            <linearGradient id="gradCenterHeart" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a4d6e" />
              <stop offset="50%" stopColor="#063852" />
              <stop offset="100%" stopColor="#032537" />
            </linearGradient>
          </defs>

          {/* LAYER 1: Wide Bottom Horizontal Wing / Cloud Lobes */}
          {/* Left bottom wing */}
          <path
            d="M180 180 C130 180 40 225 12 188 C-8 160 5 125 45 125 C85 125 135 150 180 180 Z"
            fill="url(#gradOuterCyanLeft)"
          />
          {/* Right bottom wing */}
          <path
            d="M180 180 C230 180 320 225 348 188 C368 160 355 125 315 125 C275 125 225 150 180 180 Z"
            fill="url(#gradOuterCyanRight)"
          />

          {/* LAYER 2: Middle Lateral Ascending Petals */}
          {/* Left upper-middle petal */}
          <path
            d="M180 180 C135 150 50 130 48 85 C46 50 82 40 115 58 C145 74 165 120 180 180 Z"
            fill="url(#gradMidWingLeft)"
          />
          {/* Right upper-middle petal */}
          <path
            d="M180 180 C225 150 310 130 312 85 C314 50 278 40 245 58 C215 74 195 120 180 180 Z"
            fill="url(#gradMidWingRight)"
          />

          {/* LAYER 3: Translucent Inner Flanking Petals */}
          {/* Left inner petal */}
          <path
            d="M180 180 C150 145 82 110 82 68 C82 45 105 38 128 52 C152 68 168 115 180 180 Z"
            fill="url(#gradInnerPetalLeft)"
            opacity="0.92"
          />
          {/* Right inner petal */}
          <path
            d="M180 180 C210 145 278 110 278 68 C278 45 255 38 232 52 C208 68 192 115 180 180 Z"
            fill="url(#gradInnerPetalRight)"
            opacity="0.92"
          />

          {/* LAYER 4: Prominent Dark Navy Top-Center Heart */}
          <path
            d="M180 180 C155 140 85 92 85 45 C85 18 112 5 140 18 C158 26 172 45 180 62 C188 45 202 26 220 18 C248 5 275 18 275 45 C275 92 205 140 180 180 Z"
            fill="url(#gradCenterHeart)"
          />

          {/* Central Heart Highlight subtle reflection curve */}
          <path
            d="M180 75 C186 58 198 42 214 34 C232 25 252 32 254 48 C256 82 202 128 180 160 C175 135 174 95 180 75 Z"
            fill="#0096c7"
            opacity="0.25"
          />
        </svg>
      </div>

      {/* Typography: CINHARI + Subtitle + Optional Details */}
      {variant !== 'icon' && (
        <div className={`flex flex-col ${isCentered ? 'items-center text-center' : 'items-start text-left'}`}>
          <div className="flex items-baseline gap-1.5 leading-none">
            <span
              className={`font-semibold tracking-[0.06em] uppercase ${sizeMap[size].title} ${titleColors[theme]}`}
              style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
            >
              CINHARI
            </span>
          </div>

          {showTagline && (
            <span
              className={`font-normal tracking-tight ${isCentered ? 'mt-1.5' : 'mt-1'} leading-tight ${sizeMap[size].subtitle} ${subtitleColors[theme]}`}
              style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
            >
              {customTagline}
            </span>
          )}

          {showDetails && (
            <div className={`mt-2 flex flex-col space-y-0.5 ${sizeMap[size].details} ${detailColors[theme]} font-normal leading-relaxed`}>
              <span>Calle 17 A # 13-24</span>
              <span>Teléfono 314 3674235</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


