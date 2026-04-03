export default function Careers() {
  return (
    <section id="kariera" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Kariéra
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Nabídka práce:{" "}
              <span className="text-accent">Veterinární lékař/ka</span>
            </h2>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              Elite péče začíná u spokojeného týmu. Naším cílem je nabídnout
              pacientům odbornou a komplexní péči, ale zároveň zachovat psychické
              a fyzické zdraví našich zaměstnanců.
            </p>

            {/* What we're looking for */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-primary mb-4">Hledáme:</h3>
              <div className="space-y-3">
                {[
                  "Lékaře / lékařky s praxí",
                  "Specialisty",
                  "Absolventy",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5ba8a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-primary font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:veterinaKV@seznam.cz?subject=Zájem o pozici veterinárního lékaře"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Poslat životopis
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
          </div>

          {/* Right - visual card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4">Přidejte se k nám</h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  Nabízíme přátelské pracovní prostředí, moderní vybavení,
                  možnost dalšího vzdělávání a férové finanční ohodnocení.
                </p>

                <div className="space-y-4">
                  {[
                    "Moderní vybavení a přístroje",
                    "Přátelský kolektiv",
                    "Možnost specializace",
                    "Flexibilní pracovní doba",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-white/90 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
