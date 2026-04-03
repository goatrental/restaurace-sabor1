"use client";

const games = [
  { name: "Counter-Strike 2", genre: "FPS", img: "/games/cs2.jpg" },
  { name: "Valorant", genre: "FPS", img: "/games/valorant.jpg" },
  { name: "League of Legends", genre: "MOBA", img: "/games/lol.jpg" },
  { name: "Fortnite", genre: "Battle Royale", img: "/games/fortnite.jpg" },
  { name: "Apex Legends", genre: "Battle Royale", img: "/games/apex.jpg" },
  { name: "Dota 2", genre: "MOBA", img: "/games/dota2.jpg" },
  { name: "Overwatch 2", genre: "FPS", img: "/games/overwatch2.jpg" },
  { name: "Rocket League", genre: "Sport", img: "/games/rocket-league.jpg" },
  { name: "FIFA 25", genre: "Sport", img: "/games/fifa25.jpg" },
  { name: "Minecraft", genre: "Sandbox", img: "/games/minecraft.jpg" },
  { name: "GTA V", genre: "Open World", img: "/games/gtav.jpg" },
  { name: "Call of Duty", genre: "FPS", img: "/games/cod.jpg" },
  { name: "PUBG", genre: "Battle Royale", img: "/games/pubg.jpg" },
  { name: "Rainbow Six Siege", genre: "FPS", img: "/games/r6.jpg" },
  { name: "Cyberpunk 2077", genre: "RPG", img: "/games/cyberpunk.jpg" },
  { name: "Elden Ring", genre: "RPG", img: "/games/elden-ring.jpg" },
];

function GameCard({ name, genre, img }: (typeof games)[0]) {
  return (
    <div className="group relative flex-shrink-0 w-52 rounded-lg border border-card-border bg-card-bg overflow-hidden hover:border-accent/40 transition-all hover:scale-105 cursor-pointer">
      <div className="h-32 w-full overflow-hidden">
        <img
          src={img}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-3 pt-8">
        <h3 className="text-sm font-bold truncate uppercase">{name}</h3>
        <span className="text-xs text-zinc-500 font-mono">{genre}</span>
      </div>
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity neon-glow pointer-events-none" />
    </div>
  );
}

export default function Games() {
  const doubled = [...games, ...games];

  return (
    <section id="hry" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <h2 className="text-3xl font-black uppercase tracking-wider sm:text-4xl">
          Populární <span className="text-accent neon-text">hry</span>
        </h2>
        <p className="mt-3 text-muted max-w-xl">
          Máme všechny top tituly nainstalované a připravené k hraní. Stačí si
          sednout a jet.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        <div className="flex gap-4 animate-marquee w-max">
          {doubled.map((g, i) => (
            <GameCard key={`${g.name}-${i}`} {...g} />
          ))}
        </div>
      </div>

      {/* Category tags */}
      <div className="mx-auto max-w-7xl px-6 mt-10 flex flex-wrap gap-3">
        {["FPS", "MOBA", "Battle Royale", "RPG", "Sport", "Sandbox", "Open World"].map(
          (cat) => (
            <span
              key={cat}
              className="rounded border border-card-border bg-card-bg px-4 py-1.5 text-xs text-zinc-500 uppercase tracking-wider font-mono hover:border-accent/40 hover:text-accent transition-colors cursor-pointer"
            >
              {cat}
            </span>
          )
        )}
      </div>
    </section>
  );
}
