const hours = [
  { day: "Pondělí", time: "8:00 – 17:00" },
  { day: "Úterý", time: "8:00 – 17:00" },
  { day: "Středa", time: "8:00 – 17:00" },
  { day: "Čtvrtek", time: "8:00 – 17:00" },
  { day: "Pátek", time: "8:00 – 14:00" },
  { day: "Sobota – Neděle", time: "Zavřeno" },
];

export default function Contact() {
  return (
    <section id="kontakt" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Kontakt
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Navštivte nás
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Objednejte se telefonicky nebo e-mailem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Adresa</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Hybešova 167/18, Rybáře<br />
                    360 05 Karlovy Vary
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Telefon</h3>
                  <a
                    href="tel:+420774633950"
                    className="text-accent font-medium hover:underline"
                  >
                    +420 774 633 950
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Email</h3>
                  <a
                    href="mailto:veterinaKV@seznam.cz"
                    className="text-accent font-medium hover:underline"
                  >
                    veterinaKV@seznam.cz
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Opening hours */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Ordinační hodiny
            </h3>
            <div className="space-y-3">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-primary font-medium text-sm">{h.day}</span>
                  <span
                    className={`text-sm font-medium ${
                      h.time === "Zavřeno"
                        ? "text-red-500"
                        : "text-text-secondary"
                    }`}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="tel:+420774633950"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Zavolejte nám
            </a>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden min-h-[260px] sm:min-h-[320px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-light/30 to-primary/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-primary font-semibold">Hybešova 167/18</p>
                <p className="text-text-secondary text-sm">Rybáře, 360 05 Karlovy Vary</p>
                <a
                  href="https://maps.google.com/?q=Hybešova+167/18+Karlovy+Vary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-3 hover:underline"
                >
                  Otevřít v mapách
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
