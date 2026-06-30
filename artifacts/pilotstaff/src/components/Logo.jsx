import { useId } from 'react';

export function Logo({ size = 40, showText = false, className = '' }) {
  const id = useId();

  return (
    <div className={`flex items-center ${className}`} style={{ gap: Math.round(size * 0.2) }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`lg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a3a8c" />
            <stop offset="40%" stopColor="#0f2557" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
          <linearGradient id={`gl-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a017" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="22" fill={`url(#lg-${id})`} />
        <text x="50" y="78" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="58" letterSpacing="-3">P</text>
        <circle cx="83" cy="18" r="4" fill="#fbbf24" opacity="0.9" />
      </svg>
      {showText && <span style={{ fontSize: Math.round(size * 0.45), fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>PilotStaff</span>}
    </div>
  );
}
