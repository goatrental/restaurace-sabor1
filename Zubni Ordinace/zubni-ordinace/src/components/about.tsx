const team = [
  {
    name: "MVDr. Anna Nováková",
    role: "Vedoucí veterinární lékařka",
    specialty: "Chirurgie, interní medicína",
    years: "12 let praxe",
  },
  {
    name: "MVDr. Tomáš Dvořák",
    role: "Veterinární lékař",
    specialty: "Diagnostika, dermatologie",
    years: "8 let praxe",
  },
  {
    name: "Bc. Petra Svobodová",
    role: "Veterinární technik",
    specialty: "Anestezie, pooperační péče",
    years: "6 let praxe",
  },
];

export default function About() {
  return (
    <section id="o-nas" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              O nás
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Spokojený tým pro{" "}
              <span className="text-accent">spokojené mazlíčky</span>
            </h2>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              Naším cílem je nabídnout pacientům odbornou a komplexní péči,
              ale zároveň zachovat psychické a fyzické zdraví našich zaměstnanců.
              Věříme, že spokojený tým dělá nejlepší práci.
            </p>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              Každé zvíře si u nás zaslouží individuální přístup, trpělivost
              a laskavé zacházení. Používáme moderní diagnostické a léčebné postupy.
            </p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Moderní vybavení",
                "Šetrné zacházení",
                "Individuální přístup",
                "Pohotovostní služba",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5ba8a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-primary font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - team cards */}
          <div className="space-y-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 sm:gap-5 bg-white rounded-2xl p-4 sm:p-5 border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-accent-light to-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary">{member.name}</h3>
                  <p className="text-accent text-sm font-medium">{member.role}</p>
                  <p className="text-text-secondary text-sm mt-1">
                    {member.specialty} &middot; {member.years}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
