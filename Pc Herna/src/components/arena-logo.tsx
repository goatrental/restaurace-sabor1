export default function ArenaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* A */}
      <path d="M0 112 L30 8 L42 8 L72 112 L60 112 L52 84 L20 84 L12 112 Z M24 72 L48 72 L36 28 Z" fill="currentColor" fillRule="evenodd" />

      {/* R */}
      <path d="M88 8 L88 112 L100 112 L100 68 L120 68 L138 112 L152 112 L132 66 C142 62 148 52 148 40 C148 20 134 8 114 8 Z M100 20 L114 20 C128 20 136 28 136 40 C136 52 128 58 114 58 L100 58 Z" fill="currentColor" fillRule="evenodd" />

      {/* E */}
      <path d="M170 8 L170 112 L230 112 L230 100 L182 100 L182 66 L224 66 L224 54 L182 54 L182 20 L228 20 L228 8 Z" fill="currentColor" />

      {/* N */}
      <path d="M248 8 L248 112 L260 112 L260 32 L310 112 L322 112 L322 8 L310 8 L310 88 L260 8 Z" fill="currentColor" />

      {/* A with crosshair */}
      <g transform="translate(350, 0)">
        {/* Letter A - thick, no horizontal bar */}
        <path d="M60 8 L90 112 L78 112 L69 82 L51 82 L42 112 L30 112 Z M54 70 L66 70 L60 34 Z" fill="currentColor" fillRule="evenodd" />

        {/* Scope circle */}
        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="4.5" fill="none" />

        {/* Crosshair lines */}
        <line x1="60" y1="0" x2="60" y2="6" stroke="currentColor" strokeWidth="4.5" />
        <line x1="60" y1="114" x2="60" y2="120" stroke="currentColor" strokeWidth="4.5" />
        <line x1="0" y1="60" x2="6" y2="60" stroke="currentColor" strokeWidth="4.5" />
        <line x1="114" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="4.5" />

        {/* Center dot */}
        <circle cx="60" cy="60" r="5" fill="currentColor" />
      </g>
    </svg>
  );
}
