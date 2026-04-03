"use client";

import { useState, useEffect } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const hideTimer = setTimeout(() => setShow(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {show && (
        <div
          className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-400 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Running dog animation */}
          <div className="relative w-40 sm:w-48 h-28 sm:h-32 mb-6">
            <svg
              viewBox="0 0 200 100"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style>{`
                @keyframes run {
                  0% { transform: translateX(-30px); }
                  50% { transform: translateX(30px); }
                  100% { transform: translateX(-30px); }
                }
                @keyframes legFrontLeft {
                  0% { transform: rotate(-20deg); }
                  25% { transform: rotate(30deg); }
                  50% { transform: rotate(-20deg); }
                  75% { transform: rotate(30deg); }
                  100% { transform: rotate(-20deg); }
                }
                @keyframes legFrontRight {
                  0% { transform: rotate(30deg); }
                  25% { transform: rotate(-20deg); }
                  50% { transform: rotate(30deg); }
                  75% { transform: rotate(-20deg); }
                  100% { transform: rotate(30deg); }
                }
                @keyframes legBackLeft {
                  0% { transform: rotate(25deg); }
                  25% { transform: rotate(-25deg); }
                  50% { transform: rotate(25deg); }
                  75% { transform: rotate(-25deg); }
                  100% { transform: rotate(25deg); }
                }
                @keyframes legBackRight {
                  0% { transform: rotate(-25deg); }
                  25% { transform: rotate(25deg); }
                  50% { transform: rotate(-25deg); }
                  75% { transform: rotate(25deg); }
                  100% { transform: rotate(-25deg); }
                }
                @keyframes tailWag {
                  0% { transform: rotate(-15deg); }
                  50% { transform: rotate(25deg); }
                  100% { transform: rotate(-15deg); }
                }
                @keyframes bounce {
                  0% { transform: translateY(0); }
                  25% { transform: translateY(-4px); }
                  50% { transform: translateY(0); }
                  75% { transform: translateY(-4px); }
                  100% { transform: translateY(0); }
                }
                .dog-group {
                  animation: run 2s ease-in-out infinite, bounce 0.5s ease-in-out infinite;
                }
                .leg-fl { animation: legFrontLeft 0.5s ease-in-out infinite; transform-origin: top center; }
                .leg-fr { animation: legFrontRight 0.5s ease-in-out infinite; transform-origin: top center; }
                .leg-bl { animation: legBackLeft 0.5s ease-in-out infinite; transform-origin: top center; }
                .leg-br { animation: legBackRight 0.5s ease-in-out infinite; transform-origin: top center; }
                .tail { animation: tailWag 0.4s ease-in-out infinite; transform-origin: bottom left; }
              `}</style>

              <g className="dog-group">
                <ellipse cx="100" cy="45" rx="35" ry="18" fill="#1a2744" />
                <circle cx="140" cy="32" r="16" fill="#1a2744" />
                <ellipse cx="154" cy="36" rx="8" ry="6" fill="#5ba8a0" />
                <circle cx="158" cy="34" r="3" fill="#111b30" />
                <circle cx="145" cy="28" r="3" fill="white" />
                <circle cx="146" cy="28" r="1.5" fill="#111b30" />
                <ellipse cx="132" cy="22" rx="6" ry="10" fill="#5ba8a0" transform="rotate(-20 132 22)" />
                <g className="tail">
                  <path d="M65 38 Q55 20 50 15" stroke="#5ba8a0" strokeWidth="5" strokeLinecap="round" fill="none" />
                </g>
                <g className="leg-fl">
                  <line x1="120" y1="58" x2="120" y2="82" stroke="#1a2744" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="120" cy="84" r="4" fill="#5ba8a0" />
                </g>
                <g className="leg-fr">
                  <line x1="112" y1="58" x2="112" y2="82" stroke="#1a2744" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="112" cy="84" r="4" fill="#5ba8a0" />
                </g>
                <g className="leg-bl">
                  <line x1="85" y1="58" x2="85" y2="82" stroke="#1a2744" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="85" cy="84" r="4" fill="#5ba8a0" />
                </g>
                <g className="leg-br">
                  <line x1="77" y1="58" x2="77" y2="82" stroke="#1a2744" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="77" cy="84" r="4" fill="#5ba8a0" />
                </g>
                <rect x="130" y="42" width="14" height="5" rx="2" fill="#5ba8a0" />
                <circle cx="137" cy="49" r="2" fill="#5ba8a0" />
              </g>
            </svg>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold text-[#1a2744] mb-1">
              Elite <span className="text-[#5ba8a0]">Vet</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-[#64748b]">
              Načítám
              <span className="inline-flex gap-0.5">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </div>
          </div>

          <div className="absolute bottom-12 flex gap-6 opacity-20">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="24" height="24" viewBox="0 0 100 100" fill="#1a2744" style={{ animationDelay: `${i * 200}ms` }} className="animate-pulse">
                <ellipse cx="35" cy="25" rx="8" ry="10" />
                <ellipse cx="65" cy="25" rx="8" ry="10" />
                <ellipse cx="20" cy="48" rx="7" ry="9" />
                <ellipse cx="80" cy="48" rx="7" ry="9" />
                <ellipse cx="50" cy="65" rx="18" ry="14" />
              </svg>
            ))}
          </div>
        </div>
      )}
      {children}
    </>
  );
}
