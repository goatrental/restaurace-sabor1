export default function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden pt-14 sm:pt-20">
      {/* === MOBILE: image with logo overlay === */}
      <div className="sm:hidden relative w-full aspect-[4/3] -mt-2">
        <img
          src="/hero-bg.avif"
          alt="Elite Arena"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {/* Logo over the soldier's chest */}
        <div className="absolute inset-0 flex items-end justify-center pb-[17%]">
          <img src="/elite-arena-logo.png" alt="Elite Arena" className="h-24 w-auto drop-shadow-[0_0_30px_rgba(255,106,0,0.6)]" />
        </div>
      </div>

      {/* === DESKTOP: fullscreen background === */}
      <div className="hidden sm:block">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.avif"
            alt=""
            className="h-full w-full object-contain object-top"
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:min-h-screen sm:flex sm:flex-col sm:items-center sm:justify-center sm:pt-20 pb-16 sm:pb-0">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-black/60 backdrop-blur-sm px-4 py-1.5 text-sm text-accent font-mono">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          Otevřeno denně 12:00 – 06:00
        </div>

        <div className="mb-2">
          <span className="block text-zinc-400 text-base sm:text-xl font-medium tracking-[0.3em] uppercase mb-4">
            Ponoř se do světa gamingu
          </span>
          <h1 className="hidden sm:block">
            <img src="/elite-arena-logo.png" alt="Elite Arena" className="h-[12rem] lg:h-[18rem] w-auto mx-auto drop-shadow-[0_0_30px_rgba(255,106,0,0.4)]" />
          </h1>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-300 sm:text-xl leading-relaxed drop-shadow-[0_1px_15px_rgba(0,0,0,0.9)]">
          Tvoje zóna rychlosti, reakcí a vítězství.
          <br />
          Výkonné PC, komfort a atmosféra na jednom místě.
        </p>

        <p className="mt-3 text-sm text-accent/70 font-medium italic">
          To není jen hra. To je tvoje úroveň.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#cenik"
            className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-accent to-accent-red px-8 py-3.5 text-base font-bold text-white uppercase tracking-wider hover:from-accent-glow hover:to-accent-red transition-all neon-glow hover:scale-105"
          >
            Zobrazit ceník
          </a>
          <a
            href="#hry"
            className="w-full sm:w-auto rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white uppercase tracking-wider hover:bg-white/10 hover:border-accent/40 transition-all"
          >
            Prohlédnout hry
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-8">
          {[
            { value: "30+", label: "Stanic" },
            { value: "240Hz", label: "Monitory" },
            { value: "RTX", label: "Grafiky" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-bold text-accent sm:text-3xl drop-shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] text-zinc-500 sm:text-sm uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
