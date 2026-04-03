const testimonials = [
  {
    name: "Lucie K.",
    text: "S naší fenkou sem chodíme pravidelně a vždy jsme spokojeni. Paní doktorka je neuvěřitelně šikovná a laskavá k zvířatům. Prostředí kliniky je čisté a moderní.",
    rating: 5,
    pet: "Majitelka labradora",
  },
  {
    name: "Martin P.",
    text: "Když náš kocour potřeboval akutní operaci, tým Elite Vet nás zachránil. Profesionální přístup, vše nám vysvětlili a postarali se o něj jako o vlastního. Vřele doporučuji!",
    rating: 5,
    pet: "Majitel kocoura",
  },
  {
    name: "Eva S.",
    text: "Chodíme sem se psem i kočkou. Zvířata se tu nebojí, personál je přátelský a trpělivý. Nejlepší veterina v Karlových Varech.",
    rating: 5,
    pet: "Majitelka psa a kočky",
  },
  {
    name: "Tomáš R.",
    text: "Díky pravidelné prevenci a vakcinaci je náš zlatý retriever v perfektní kondici. Děkuji celému týmu za skvělou péči a rady ohledně výživy!",
    rating: 5,
    pet: "Majitel retrievera",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#facc15"
          stroke="#facc15"
          strokeWidth="1"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="recenze" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Recenze
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Co říkají naši klienti
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Spokojenost zvířat i jejich majitelů je pro nás tou nejlepší vizitkou.
          </p>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="min-w-[85vw] sm:min-w-[340px] max-w-[400px] flex-shrink-0 snap-start p-6 sm:p-8 rounded-2xl border border-border bg-muted/50 hover:shadow-md transition-shadow"
            >
              <Stars count={t.rating} />
              <p className="mt-4 text-primary leading-relaxed text-base sm:text-lg">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-accent font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-primary text-sm">{t.name}</div>
                  <div className="text-text-secondary text-xs">{t.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-muted rounded-full px-6 py-3 border border-border">
            <Stars count={5} />
            <span className="text-sm text-text-secondary">
              <span className="font-semibold text-primary">4.9/5</span> na Google recenzích
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
