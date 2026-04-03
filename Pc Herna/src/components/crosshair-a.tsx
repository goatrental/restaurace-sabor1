export default function CrosshairA({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Letter A - thick, no horizontal bar */}
      <path
        d="M60 8 L88 112 L76 112 L68 84 L52 84 L44 112 L32 112 Z M54.5 72 L65.5 72 L60 38 Z"
        fill="currentColor"
        fillRule="evenodd"
      />

      {/* Outer circle - scope ring */}
      <circle cx="60" cy="62" r="48" stroke="currentColor" strokeWidth="5" fill="none" />

      {/* Crosshair lines extending beyond circle */}
      {/* Top */}
      <line x1="60" y1="0" x2="60" y2="10" stroke="currentColor" strokeWidth="5" />
      {/* Bottom */}
      <line x1="60" y1="114" x2="60" y2="120" stroke="currentColor" strokeWidth="5" />
      {/* Left */}
      <line x1="0" y1="62" x2="8" y2="62" stroke="currentColor" strokeWidth="5" />
      {/* Right */}
      <line x1="112" y1="62" x2="120" y2="62" stroke="currentColor" strokeWidth="5" />

      {/* Center dot - replaces A's horizontal bar */}
      <circle cx="60" cy="62" r="6" fill="currentColor" />
    </svg>
  );
}
