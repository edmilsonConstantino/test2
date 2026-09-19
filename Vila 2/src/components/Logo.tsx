import React from 'react';

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ showTagline = true, className = '', size = 'md' }) => {
  // Proportional scaling for icon, title and tagline
  const dimensions = {
    sm: {
      pin: 'w-8 h-9',
      title: 'text-[23px]',
      tagline: 'text-[8px] leading-[1.25]',
      gap: 'gap-2.5',
      mt: 'mt-1.5',
    },
    md: {
      pin: 'w-9 h-10',
      title: 'text-[25px]',
      tagline: 'text-[8.5px] leading-[1.25]',
      gap: 'gap-2.5',
      mt: 'mt-1.5',
    },
    lg: {
      pin: 'w-12 h-13',
      title: 'text-[32px]',
      tagline: 'text-[10px] leading-[1.3]',
      gap: 'gap-3',
      mt: 'mt-2',
    },
    xl: {
      pin: 'w-14 h-16',
      title: 'text-[38px]',
      tagline: 'text-[11.5px] leading-[1.3]',
      gap: 'gap-3.5',
      mt: 'mt-2.5',
    },
  }[size];

  return (
    <div className={`flex flex-col select-none ${className}`} id="brand-logo-container">
      {/* Top row: Pin Icon + VILA wordmark */}
      <div className={`flex items-center ${dimensions.gap}`}>
        {/* Multicolor Vector Location Pin with Village Skyline */}
        <div className={`relative shrink-0 ${dimensions.pin}`}>
          <svg
            viewBox="0 0 48 54"
            className="w-full h-full drop-shadow-2xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer gradient perimeter */}
              <linearGradient id="vila-pin-rim" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#F58300" />
                <stop offset="25%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="78%" stopColor="#1455AC" />
                <stop offset="100%" stopColor="#0F448A" />
              </linearGradient>

              {/* Inner clean background */}
              <linearGradient id="vila-pin-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F0F5FC" />
              </linearGradient>

              {/* Village Buildings Gradients */}
              <linearGradient id="bldg-amber" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F58300" />
              </linearGradient>
              <linearGradient id="bldg-coral" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
              <linearGradient id="bldg-emerald" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="bldg-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="water-wave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1455AC" />
                <stop offset="100%" stopColor="#0F448A" />
              </linearGradient>
            </defs>

            {/* Teardrop Location Pin Shell */}
            <path
              d="M24 2.8 C35.2 2.8 45.2 12.5 45.2 23.5 C45.2 35 32 46.5 24 52.5 C16 46.5 2.8 35 2.8 23.5 C2.8 12.5 12.8 2.8 24 2.8 Z"
              fill="url(#vila-pin-bg)"
              stroke="url(#vila-pin-rim)"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />

            {/* Stylized Village Skyline (A Vila) */}
            <path d="M10 27V19.5L13.5 16L17 19.5V27H10Z" fill="url(#bldg-amber)" />
            <path d="M15 27V16.5L19 13L23 16.5V27H15Z" fill="url(#bldg-coral)" />
            <path d="M21 27V13L25 9.5L29 13V27H21Z" fill="url(#bldg-emerald)" />
            <path d="M27 27V16L31 12.5L35 16V27H27Z" fill="url(#bldg-cyan)" />
            <path d="M33 27V20.5L36.5 17.5L39 19.5V27H33Z" fill="#1455AC" />

            {/* Earth curvature / water wave at base */}
            <path
              d="M4.5 27 Q 24 35 43.5 27 Q 34 46.5 24 50 Q 14 46.5 4.5 27 Z"
              fill="url(#water-wave)"
            />
            {/* White wave ripple accent */}
            <path
              d="M10 32 Q 24 37.5 38 32"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Brand Text "VILA" */}
        <div className="flex items-center leading-none">
          <span
            className={`${dimensions.title} font-black text-[#1455AC] font-sans tracking-[0.02em] flex items-center leading-none`}
          >
            <span>VIL</span>
            <span className="text-[#F58300] ml-[0.5px]">A</span>
          </span>
        </div>
      </div>

      {/* Tagline below logo */}
      {showTagline && (
        <div
          className={`${dimensions.mt} ${dimensions.tagline} font-extrabold tracking-[0.05em] text-[#64748B] uppercase font-sans select-none`}
        >
          <p className="whitespace-nowrap">O MUNDO É UMA VILA.</p>
          <p className="whitespace-nowrap mt-[1px]">
            E NÓS SOMOS <span className="text-[#F58300] font-black">UM.</span>
          </p>
        </div>
      )}
    </div>
  );
};

