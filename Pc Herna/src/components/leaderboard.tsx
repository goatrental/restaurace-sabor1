"use client";

import { useState } from "react";

type Game = "CS2" | "Valorant" | "LoL" | "Fortnite";

const leaderboardData: Record<
  Game,
  { rank: number; name: string; score: string; wins: number; avatar: string }[]
> = {
  CS2: [
    { rank: 1, name: "xNightmare", score: "2,847", wins: 156, avatar: "🎯" },
    { rank: 2, name: "CzechForce", score: "2,691", wins: 142, avatar: "💀" },
    { rank: 3, name: "ShadowBlade", score: "2,534", wins: 128, avatar: "⚡" },
    { rank: 4, name: "AceHunter", score: "2,418", wins: 119, avatar: "🔥" },
    { rank: 5, name: "FrostBite", score: "2,305", wins: 108, avatar: "❄️" },
    { rank: 6, name: "VenomStrike", score: "2,198", wins: 97, avatar: "🐍" },
    { rank: 7, name: "IronWolf", score: "2,076", wins: 89, avatar: "🐺" },
    { rank: 8, name: "PhantomX", score: "1,954", wins: 82, avatar: "👻" },
  ],
  Valorant: [
    { rank: 1, name: "DualistKing", score: "3,102", wins: 201, avatar: "⚔️" },
    { rank: 2, name: "SilentShot", score: "2,945", wins: 187, avatar: "🤫" },
    { rank: 3, name: "NeonRush", score: "2,812", wins: 173, avatar: "💜" },
    { rank: 4, name: "OmenMain", score: "2,687", wins: 162, avatar: "🌑" },
    { rank: 5, name: "CyberAce", score: "2,543", wins: 148, avatar: "🤖" },
    { rank: 6, name: "FlashPoint", score: "2,401", wins: 134, avatar: "💡" },
    { rank: 7, name: "SteelNerve", score: "2,289", wins: 121, avatar: "🛡️" },
    { rank: 8, name: "ViperQueen", score: "2,156", wins: 109, avatar: "🐉" },
  ],
  LoL: [
    { rank: 1, name: "MidGod", score: "LP 1,245", wins: 312, avatar: "👑" },
    { rank: 2, name: "JungleDiff", score: "LP 1,102", wins: 289, avatar: "🌿" },
    { rank: 3, name: "ADCarry99", score: "LP 987", wins: 267, avatar: "🏹" },
    { rank: 4, name: "SupportLife", score: "LP 854", wins: 245, avatar: "💚" },
    { rank: 5, name: "TopLaner", score: "LP 743", wins: 228, avatar: "🗡️" },
    { rank: 6, name: "Pentakill", score: "LP 651", wins: 209, avatar: "🔥" },
    { rank: 7, name: "WardBot", score: "LP 578", wins: 192, avatar: "👁️" },
    { rank: 8, name: "DragonSoul", score: "LP 489", wins: 174, avatar: "🐲" },
  ],
  Fortnite: [
    { rank: 1, name: "BuildMaster", score: "15,420", wins: 423, avatar: "🏗️" },
    { rank: 2, name: "CrankKing", score: "14,190", wins: 398, avatar: "👑" },
    { rank: 3, name: "StormChaser", score: "13,045", wins: 371, avatar: "🌩️" },
    { rank: 4, name: "EditGod", score: "12,301", wins: 345, avatar: "✏️" },
    { rank: 5, name: "VictoryLap", score: "11,567", wins: 318, avatar: "🏆" },
    { rank: 6, name: "SniperElite", score: "10,834", wins: 292, avatar: "🎯" },
    { rank: 7, name: "BoxFighter", score: "10,102", wins: 267, avatar: "📦" },
    { rank: 8, name: "ZoneWarrior", score: "9,445", wins: 241, avatar: "⚡" },
  ],
};

const rankColors = ["text-accent", "text-zinc-400", "text-amber-700"];

export default function Leaderboard() {
  const [activeGame, setActiveGame] = useState<Game>("CS2");

  return (
    <section id="leaderboard" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-wider sm:text-4xl">
            Leader<span className="text-accent neon-text">board</span>
          </h2>
          <p className="mt-3 text-muted">
            Předháněj se s ostatními hráči. Top 8 každý měsíc získá odměny.
          </p>
        </div>

        {/* Game tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {(Object.keys(leaderboardData) as Game[]).map((game) => (
            <button
              key={game}
              onClick={() => setActiveGame(game)}
              className={`rounded px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
                activeGame === game
                  ? "bg-gradient-to-r from-accent to-accent-red text-white neon-glow"
                  : "border border-card-border text-zinc-500 hover:text-foreground hover:border-accent/30"
              }`}
            >
              {game}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-lg border border-card-border bg-card-bg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[3rem_1fr_6rem_5rem] sm:grid-cols-[4rem_1fr_8rem_6rem] items-center gap-2 px-4 sm:px-6 py-3 border-b border-card-border text-xs text-zinc-600 font-mono uppercase tracking-wider">
            <span>#</span>
            <span>Hráč</span>
            <span className="text-right">Skóre</span>
            <span className="text-right">Výhry</span>
          </div>

          {/* Rows */}
          {leaderboardData[activeGame].map((player) => (
            <div
              key={player.name}
              className={`grid grid-cols-[3rem_1fr_6rem_5rem] sm:grid-cols-[4rem_1fr_8rem_6rem] items-center gap-2 px-4 sm:px-6 py-4 border-b border-card-border/50 last:border-b-0 transition-colors hover:bg-accent/5 ${
                player.rank === 1 ? "bg-accent/5" : ""
              }`}
            >
              <span
                className={`text-lg font-black ${
                  rankColors[player.rank - 1] || "text-zinc-600"
                }`}
              >
                {player.rank}
              </span>
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl flex-shrink-0">{player.avatar}</span>
                <span className="font-bold text-sm truncate">
                  {player.name}
                </span>
              </div>
              <span className="text-right text-sm font-mono text-accent">
                {player.score}
              </span>
              <span className="text-right text-sm text-zinc-500">
                {player.wins}W
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600 uppercase tracking-wider">
          Aktualizováno měsíčně • Top 3 hráči získají hodiny hraní zdarma
        </p>
      </div>
    </section>
  );
}
