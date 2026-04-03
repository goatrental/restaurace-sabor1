"use client";

import { useState, useEffect } from "react";

const soldiers = [
  { id: 1, top: "25%", left: "20%", delay: 0, scale: 0.8 },
  { id: 2, top: "60%", left: "75%", delay: 0.4, scale: 0.7 },
  { id: 3, top: "35%", left: "65%", delay: 0.9, scale: 0.9 },
  { id: 4, top: "70%", left: "25%", delay: 1.3, scale: 0.6 },
  { id: 5, top: "45%", left: "50%", delay: 1.7, scale: 1 },
];

function SoldierSilhouette({ top, left, delay, scale, active }: {
  top: string; left: string; delay: number; scale: number; active: boolean;
}) {
  return (
    <div
      className="absolute z-[2]"
      style={{
        top, left, transform: `translate(-50%, -50%) scale(${scale})`,
        animation: active ? `soldierAppear 0.4s ${delay}s ease-out both` : undefined,
        opacity: 0,
      }}
    >
      <svg width="60" height="90" viewBox="0 0 60 90" fill="none">
        {/* Head */}
        <circle cx="30" cy="12" r="8" fill="#ff6a00" opacity="0.15" />
        <circle cx="30" cy="12" r="8" stroke="#ff6a00" strokeWidth="1" opacity="0.4" />
        {/* Helmet */}
        <path d="M22 10 Q22 4 30 3 Q38 4 38 10" stroke="#ff6a00" strokeWidth="1" opacity="0.4" fill="#ff6a00" fillOpacity="0.1" />
        {/* Body/torso */}
        <path d="M20 22 L30 20 L40 22 L42 50 L18 50 Z" fill="#ff6a00" opacity="0.12" stroke="#ff6a00" strokeWidth="1" strokeOpacity="0.35" />
        {/* Arms */}
        <path d="M20 24 L8 40 L12 42 L22 30" fill="#ff6a00" opacity="0.1" stroke="#ff6a00" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M40 24 L52 38 L48 42 L38 30" fill="#ff6a00" opacity="0.1" stroke="#ff6a00" strokeWidth="1" strokeOpacity="0.3" />
        {/* Gun in right hand */}
        <path d="M48 38 L58 34 L58 36 L50 40" fill="#ff6a00" opacity="0.2" stroke="#ff6a00" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Legs */}
        <path d="M22 50 L18 80 L24 80 L28 55" fill="#ff6a00" opacity="0.1" stroke="#ff6a00" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M38 50 L42 80 L36 80 L32 55" fill="#ff6a00" opacity="0.1" stroke="#ff6a00" strokeWidth="1" strokeOpacity="0.3" />
        {/* Boots */}
        <path d="M16 78 L26 78 L26 84 L14 84 Z" fill="#ff6a00" opacity="0.15" />
        <path d="M34 78 L44 78 L46 84 L34 84 Z" fill="#ff6a00" opacity="0.15" />
      </svg>
      {/* "Target acquired" flash when crosshair passes */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          animation: active ? `soldierFlash 0.3s ${delay + 0.2}s ease-out both` : undefined,
          opacity: 0,
        }}
      >
        <div className="absolute -inset-4 border border-red-500/40 rounded" />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-red-500/60 whitespace-nowrap tracking-wider">
          TARGET
        </div>
      </div>
    </div>
  );
}

export default function IntroAnimation() {
  const [phase, setPhase] = useState<"hunting" | "locked" | "split" | "done">("hunting");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("locked"), 2200);
    const t2 = setTimeout(() => setPhase("split"), 2800);
    const t3 = setTimeout(() => setPhase("done"), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Left panel with neon edge */}
      <div
        className="absolute top-0 left-0 h-full w-1/2 bg-black"
        style={{
          transition: "transform 0.7s ease-in-out",
          transform: phase === "split" ? "translateX(-100%)" : "translateX(0)",
          borderRight: phase === "split" ? "2px solid #ff6a00" : "none",
          boxShadow: phase === "split" ? "8px 0 30px rgba(255, 106, 0, 0.6), 4px 0 80px rgba(255, 106, 0, 0.3)" : "none",
        }}
      />
      {/* Right panel with neon edge */}
      <div
        className="absolute top-0 right-0 h-full w-1/2 bg-black"
        style={{
          transition: "transform 0.7s ease-in-out",
          transform: phase === "split" ? "translateX(100%)" : "translateX(0)",
          borderLeft: phase === "split" ? "2px solid #ff6a00" : "none",
          boxShadow: phase === "split" ? "-8px 0 30px rgba(255, 106, 0, 0.6), -4px 0 80px rgba(255, 106, 0, 0.3)" : "none",
        }}
      />

      {/* Soldier silhouettes */}
      {phase !== "split" && soldiers.map((s) => (
        <SoldierSilhouette
          key={s.id}
          top={s.top}
          left={s.left}
          delay={s.delay}
          scale={s.scale}
          active={phase === "hunting"}
        />
      ))}

      {/* Crosshair */}
      {phase !== "split" && (
        <div
          className="absolute z-10"
          style={{
            animation: phase === "hunting" ? "crosshairHunt 2.2s ease-in-out forwards" : undefined,
            top: phase !== "hunting" ? "50%" : undefined,
            left: phase !== "hunting" ? "50%" : undefined,
            transform: phase !== "hunting" ? "translate(-50%, -50%)" : undefined,
          }}
        >
          <div style={{
            animation: phase === "locked" ? "crosshairLock 0.6s ease-in-out forwards" : undefined,
          }}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              {/* Outer circle */}
              <circle cx="50" cy="50" r="38" stroke="#ff6a00" strokeWidth="2" opacity="0.7" />
              {/* Inner circle */}
              <circle cx="50" cy="50" r="16" stroke="#ff6a00" strokeWidth="1.5" opacity="0.5" />
              {/* Crosshair lines */}
              <line x1="50" y1="2" x2="50" y2="22" stroke="#ff6a00" strokeWidth="3" />
              <line x1="50" y1="78" x2="50" y2="98" stroke="#ff6a00" strokeWidth="3" />
              <line x1="2" y1="50" x2="22" y2="50" stroke="#ff6a00" strokeWidth="3" />
              <line x1="78" y1="50" x2="98" y2="50" stroke="#ff6a00" strokeWidth="3" />
              {/* Center dot */}
              <circle cx="50" cy="50" r="3" fill="#ff6a00" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
