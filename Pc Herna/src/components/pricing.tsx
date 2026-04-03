const tiers = [
  {
    name: "Standard",
    subtitle: "HERNÍ PC RTX",
    description: "Výkonný počítač s RTX grafikou pro běžné hraní",
    price: 80,
    features: [
      "RTX 4060 grafika",
      "144Hz monitor",
      "Herní periferie",
      "Sluchátka s mikrofonem",
      "Vysokorychlostní internet",
    ],
    popular: false,
  },
  {
    name: "240Hz Monitory",
    subtitle: "240Hz MONITORY",
    description: "Obnovovací frekvence 240 Hz pro maximální plynulost",
    price: 120,
    features: [
      "RTX 4070 Ti grafika",
      "240Hz IPS monitor",
      "Mechanická klávesnice",
      "Pro gaming myš",
      "Noise-cancelling sluchátka",
      "Prioritní místo",
    ],
    popular: true,
  },
  {
    name: "Premium Křesla",
    subtitle: "PREMIUM KŘESLA",
    description: "Pohodlná křesla pro nejlepší herní zážitek",
    price: 300,
    features: [
      "RTX 4080 Super grafika",
      "240Hz OLED monitor",
      "Premium periferie Logitech Pro",
      "Ergonomické křeslo Secretlab",
      "Soukromá zóna",
      "Nápoj zdarma",
      "Prioritní podpora",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="cenik" className="py-24 grid-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-wider sm:text-4xl">
            Vyber si svůj <span className="text-accent neon-text">level</span>
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Tři úrovně vybavení. Každá nabízí jiný zážitek. Všechny mají jedno
            společné — čistý gaming bez kompromisů.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-lg border p-8 transition-all hover:scale-[1.02] ${
                tier.popular
                  ? "border-accent/50 bg-accent/5 neon-glow"
                  : "border-card-border bg-card-bg hover:border-accent/20"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-gradient-to-r from-accent to-accent-red px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  Nejoblíbenější
                </div>
              )}

              <h3 className="text-xl font-black uppercase tracking-wider">{tier.name}</h3>
              <p className="text-xs text-muted mt-1 font-mono tracking-wider">
                {tier.subtitle}
              </p>
              <p className="text-sm text-muted mt-2">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-accent">
                  {tier.price} Kč
                </span>
                <span className="text-muted text-sm">/ hodina</span>
              </div>

              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-lg py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-accent to-accent-red text-white hover:from-accent-glow hover:to-accent-red neon-glow"
                    : "border border-card-border text-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                Vybrat {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
