export default function Hero() {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-light/40 via-white to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-36 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Přijímáme nové pacienty
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight">
            Odborná péče pro{" "}
            <span className="text-accent">vaše mazlíčky</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto md:mx-0">
            Komplexní veterinární péče s individuálním a laskavým přístupem ke každému zvířecímu pacientovi. Moderní vybavení a zkušený tým.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center md:justify-start">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Objednat návštěvu
            </a>
            <a
              href="tel:+420774633950"
              className="inline-flex items-center justify-center gap-2 border-2 border-border text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +420 774 633 950
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-5 sm:gap-8 mt-8 sm:mt-12 justify-center md:justify-start">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-text-secondary">Let praxe</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">3000+</div>
              <div className="text-sm text-text-secondary">Spokojených klientů</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">4.9</div>
              <div className="text-sm text-text-secondary">Hodnocení</div>
            </div>
          </div>
        </div>

        {/* Feature cards visual */}
        <div className="flex-1 w-full max-w-lg">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary-dark border border-border shadow-2xl shadow-accent/10 p-5 sm:p-8 flex flex-col gap-4 sm:gap-5">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/15 rounded-full -translate-y-1/4 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full translate-y-1/3 -translate-x-1/3" />

            {/* Logo area */}
            <div className="relative flex items-center justify-center py-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Elite <span className="text-accent">Vet</span></div>
                <div className="text-white/50 text-sm">Veterinární klinika Karlovy Vary</div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="relative space-y-3">
              {[
                { icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z", title: "Psi, kočky i exoti", desc: "Péče pro všechny mazlíčky" },
                { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3", title: "Preventivní péče", desc: "Vakcinace a pravidelné prohlídky" },
                { icon: "M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2", title: "Moderní diagnostika", desc: "RTG, ultrazvuk, laboratoř" },
                { icon: "M9 12h6M12 9v6 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", title: "Chirurgie", desc: "Operační sál s monitoringem" },
                { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z", title: "Pohotovost", desc: "+420 774 633 950" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-accent/25 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="text-xs text-white/55">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom badge */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5ba8a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">Laskavá péče</div>
                  <div className="text-xs text-text-secondary">Hybešova 167/18, Rybáře</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
