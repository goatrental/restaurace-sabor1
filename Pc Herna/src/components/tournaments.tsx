"use client";

import { useState } from "react";
import RegisterModal from "./register-modal";

const events = [
  {
    title: "CS2 Friday Night Cup",
    date: "Každý pátek",
    time: "20:00",
    game: "Counter-Strike 2",
    format: "5v5 • BO3",
    prize: "5 000 Kč",
    spots: "10/16 týmů",
    hot: true,
  },
  {
    title: "Valorant Showdown",
    date: "Sobota 12. dubna",
    time: "18:00",
    game: "Valorant",
    format: "5v5 • Single Elim",
    prize: "3 000 Kč",
    spots: "6/8 týmů",
    hot: true,
  },
  {
    title: "LoL 1v1 Outplay",
    date: "Neděle 13. dubna",
    time: "15:00",
    game: "League of Legends",
    format: "1v1 • Double Elim",
    prize: "1 500 Kč",
    spots: "12/32 hráčů",
    hot: false,
  },
  {
    title: "FIFA 25 Liga",
    date: "Každou středu",
    time: "19:00",
    game: "FIFA 25",
    format: "1v1 • Liga",
    prize: "2 000 Kč",
    spots: "8/16 hráčů",
    hot: false,
  },
];

const nightIcons = {
  moon: (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  ),
  party: (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  gamepad: (
    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.657-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
    </svg>
  ),
};

const nightEvents = [
  {
    title: "Noční Maratón",
    desc: "22:00 – 06:00 non-stop gaming. Flat rate 400 Kč za celou noc na jakékoliv stanici.",
    icon: nightIcons.moon,
    tag: "Každý pátek & sobota",
  },
  {
    title: "LAN Party",
    desc: "Přiveď partu, obstaráme jídlo, pití a nejvýkonnější stroje. Rezervace od 10 lidí.",
    icon: nightIcons.party,
    tag: "Na objednávku",
  },
  {
    title: "Retro Night",
    desc: "Jednou měsíčně retro konzole, arkády a nostalgický gaming. PS2, N64, GameCube.",
    icon: nightIcons.gamepad,
    tag: "1× měsíčně",
  },
];

export default function Tournaments() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState("");

  return (
    <>
    <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} tournament={selectedTournament} />
    <section id="turnaje" className="py-24 grid-bg">
      <div className="mx-auto max-w-7xl px-6">
        {/* Tournaments */}
        <div className="mb-20">
          <h2 className="text-3xl font-black uppercase tracking-wider sm:text-4xl">
            Turnaje & <span className="text-accent neon-text">Eventy</span>
          </h2>
          <p className="mt-3 text-muted max-w-xl">
            Registruj se do turnajů, poměř síly a vyhraj ceny. Pravidelné akce
            každý týden.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {events.map((e) => (
              <div
                key={e.title}
                className="group relative rounded-lg border border-card-border bg-card-bg p-6 hover:border-accent/30 transition-all"
              >
                {e.hot && (
                  <span className="absolute top-4 right-4 rounded bg-accent-red/20 px-2.5 py-0.5 text-xs font-bold text-accent uppercase tracking-wider">
                    HOT
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-xs font-mono text-accent bg-accent/10 rounded px-3 py-1.5 uppercase tracking-wider">
                    {e.date} • {e.time}
                  </div>
                </div>
                <h3 className="text-lg font-black uppercase">{e.title}</h3>
                <p className="text-sm text-zinc-500 mt-1">{e.game}</p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <span className="rounded border border-card-border px-2.5 py-1 text-zinc-500 font-mono">
                    {e.format}
                  </span>
                  <span className="rounded border border-card-border px-2.5 py-1 text-zinc-500 font-mono">
                    {e.spots}
                  </span>
                  <span className="rounded border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent font-bold">
                    {e.prize}
                  </span>
                </div>

                <button
                  onClick={() => { setSelectedTournament(e.title); setModalOpen(true); }}
                  className="mt-5 w-full rounded-lg border border-accent/30 py-2.5 text-sm font-bold uppercase tracking-wider text-accent hover:bg-gradient-to-r hover:from-accent hover:to-accent-red hover:text-white hover:border-transparent transition-all"
                >
                  Registrovat tým
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Night gaming */}
        <div>
          <h2 className="text-3xl font-black uppercase tracking-wider sm:text-4xl">
            Noční <span className="text-accent neon-text">hraní</span>
          </h2>
          <p className="mt-3 text-muted max-w-xl">
            Speciální akce pro ty, co nespí. Gaming do rána za zvýhodněné ceny.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {nightEvents.map((ne) => (
              <div
                key={ne.title}
                className="rounded-lg border border-card-border bg-card-bg p-6 hover:border-accent/20 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">{ne.icon}</div>
                <div className="mt-3 text-xs font-mono text-accent/60 uppercase tracking-wider">
                  {ne.tag}
                </div>
                <h3 className="mt-2 text-lg font-black uppercase">{ne.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                  {ne.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
