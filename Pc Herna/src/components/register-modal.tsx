"use client";

import { useState } from "react";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  tournament: string;
}

export default function RegisterModal({ open, onClose, tournament }: RegisterModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-lg border border-card-border bg-card-bg p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-accent/20 mb-4">
              <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-black uppercase tracking-wider">Registrace odeslána!</h3>
            <p className="mt-2 text-zinc-500 text-sm">Ozveme se ti na email s potvrzením. Připrav se na boj!</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-black uppercase tracking-wider mb-1">Registrace do turnaje</h3>
            <p className="text-accent text-sm font-mono mb-6">{tournament}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Název týmu</label>
                <input
                  type="text"
                  required
                  placeholder="např. CzechForce"
                  className="w-full rounded-lg border border-card-border bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Kapitán (nick)</label>
                <input
                  type="text"
                  required
                  placeholder="Tvůj herní nick"
                  className="w-full rounded-lg border border-card-border bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-card-border bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Telefon</label>
                <input
                  type="tel"
                  required
                  placeholder="+420 ..."
                  className="w-full rounded-lg border border-card-border bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Počet hráčů v týmu</label>
                <select
                  required
                  className="w-full rounded-lg border border-card-border bg-black/50 px-4 py-3 text-sm text-foreground focus:border-accent/50 focus:outline-none transition-colors"
                >
                  <option value="">Vyber...</option>
                  <option value="1">1 (solo)</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Poznámka (volitelné)</label>
                <textarea
                  rows={2}
                  placeholder="Něco navíc?"
                  className="w-full rounded-lg border border-card-border bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-accent to-accent-red py-3.5 text-sm font-bold text-white uppercase tracking-wider hover:from-accent-glow hover:to-accent-red transition-all neon-glow"
              >
                Odeslat registraci
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
