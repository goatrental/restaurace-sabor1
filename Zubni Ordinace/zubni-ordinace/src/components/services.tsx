const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Preventivní péče",
    description:
      "Pravidelné prohlídky, vakcinace a odčervení. Prevence je základ zdraví vašeho mazlíčka.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6M12 9v6" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    title: "Chirurgie",
    description:
      "Kastrační, abdominální i ortopedické zákroky. Moderní operační sál s anesteziologickým monitoringem.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Diagnostika",
    description:
      "RTG, ultrazvuk, laboratorní vyšetření krve a moči. Rychlá a přesná diagnostika pro správnou léčbu.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9.5 2 7 3 6 5C5 7 4.5 9.5 5 12C5.5 14.5 6.5 17 8 19C9 20.5 10.5 22 12 22C13.5 22 15 20.5 16 19C17.5 17 18.5 14.5 19 12C19.5 9.5 19 7 18 5C17 3 14.5 2 12 2Z" />
      </svg>
    ),
    title: "Stomatologie",
    description:
      "Ošetření zubů, extrakce, ultrazvukové čištění. Péče o dutinu ústní pro zdravý chrup vašeho mazlíčka.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Interní medicína",
    description:
      "Diagnostika a léčba vnitřních onemocnění, kardiologie, endokrinologie a gastroenterologie.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-6 0v4" />
        <rect x="5" y="9" width="14" height="12" rx="2" />
        <circle cx="12" cy="15" r="1" />
      </svg>
    ),
    title: "Dermatologie",
    description:
      "Léčba kožních problémů, alergií a parazitárních onemocnění. Komplexní péče o kůži a srst.",
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Naše služby
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Komplexní péče o vaše zvířata
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Nabízíme širokou škálu veterinárních služeb s využitím nejmodernějšího vybavení a bohatých zkušeností.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 sm:p-8 rounded-2xl border border-border bg-white hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-light text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
