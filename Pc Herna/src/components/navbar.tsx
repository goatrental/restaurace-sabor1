"use client";

import { useState } from "react";

const links = [
  { href: "#hry", label: "Hry" },
  { href: "#cenik", label: "Ceník" },
  { href: "#leaderboard", label: "Leaderboard" },
  { href: "#turnaje", label: "Turnaje" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl overflow-visible">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1">
        <a href="#">
          <img src="/elite-arena-logo.png" alt="Elite Arena" className="h-20 sm:h-24 w-auto -my-4" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-500 uppercase tracking-wider font-medium hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cenik"
            className="rounded bg-gradient-to-r from-accent to-accent-red px-5 py-2 text-sm font-bold text-white uppercase tracking-wider hover:from-accent-glow hover:to-accent-red transition-colors neon-glow"
          >
            Rezervovat
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-400"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-zinc-500 uppercase tracking-wider hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
