export default function Contact() {
  return (
    <section id="kontakt" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-lg border border-card-border bg-card-bg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Info */}
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-black uppercase tracking-wider sm:text-4xl">
                Kde nás <span className="text-accent neon-text">najdeš</span>
              </h2>
              <p className="mt-3 text-zinc-500">
                Přijď si zahrát kdykoliv. Rezervace není nutná, ale doporučujeme
                pro skupiny 5+.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                    title: "Adresa",
                    text: "Ulice 10, Ostrava",
                  },
                  {
                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    title: "Telefon",
                    text: "+420 123 456 789",
                  },
                  {
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "Otevírací doba",
                    text: "Denně: 12:00 – 06:00",
                  },
                  {
                    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    title: "Email",
                    text: "info@elitearena.cz",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-accent/10 text-accent">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-sm">{item.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-10 flex gap-4">
                {[
                  { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z" },
                  { label: "Discord", path: "M18.93 5.34A16.89 16.89 0 0014.86 4a12.08 12.08 0 00-.53 1.07 15.66 15.66 0 00-4.66 0A11.75 11.75 0 009.14 4a16.84 16.84 0 00-4.08 1.34A17.52 17.52 0 002 18.65a17 17 0 005.17 2.65 13 13 0 001.11-1.83 11 11 0 01-1.75-.84l.42-.34a12.15 12.15 0 0010.1 0l.42.34a11.05 11.05 0 01-1.75.84 12.78 12.78 0 001.11 1.83A16.94 16.94 0 0022 18.65a17.45 17.45 0 00-3.07-13.31zM8.68 15.82a1.94 1.94 0 01-1.82-2 1.93 1.93 0 011.82-2 1.93 1.93 0 011.82 2 1.94 1.94 0 01-1.82 2zm6.64 0a1.94 1.94 0 01-1.82-2 1.93 1.93 0 011.82-2 1.93 1.93 0 011.82 2 1.94 1.94 0 01-1.82 2z" },
                  { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded border border-card-border text-zinc-500 hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative min-h-[300px] bg-black/50">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-zinc-500">
                <div className="h-16 w-16 rounded bg-accent/10 flex items-center justify-center">
                  <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-bold text-foreground uppercase tracking-wider">
                    Elite Arena
                  </p>
                  <p className="text-sm">Ulice 10, Ostrava</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ulice+10+Ostrava"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-accent/30 px-4 py-2 text-sm font-bold text-accent uppercase tracking-wider hover:bg-gradient-to-r hover:from-accent hover:to-accent-red hover:text-white hover:border-transparent transition-all"
                >
                  Otevřít v mapách
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
