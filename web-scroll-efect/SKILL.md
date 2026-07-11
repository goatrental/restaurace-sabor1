---
name: web-scroll-efect
description: >
  Scroll-scrubbed frame-sequence animace v hero sekci (Apple styl) — jak scrolluješ,
  přehrává se sekvence obrázků (webp/jpg snímky) podle pozice scrollu, kreslená na
  <canvas>. Postaveno a odladěno pro Next.js appku (Card Trader Pattaya). Použij VŽDY
  když uživatel napíše "/web-scroll-efect", "web scroll efekt", "scroll animace",
  "scroll efekt", "scrollovací animace", "animace při scrollování", "scroll-scrubbed",
  "frame sequence on scroll", "Apple style scroll animation", "image sequence scroll",
  NEBO když pošle ZIP/složku očíslovaných snímků (0001.webp, 0002.webp…) a chce, aby
  se přehrávaly podle scrollu v hero/na webu. Obsahuje i variantu Lottie intro
  (loading screen s .lottie animací). Trigger v češtině i angličtině.
metadata:
  type: reference
---

# web-scroll-efect — scroll-scrubbed frame sequence

Přehrávání sekvence obrázků (číslované snímky) podle pozice scrollu, kreslené na
`<canvas>`. Vzniklo v projektu **Card Trader Pattaya** (Next.js app ve složce `app/`,
nasazená na Vercelu). Klíčové soubory: `app/src/components/Hero.tsx` a
`app/src/components/LoadingScreen.tsx`.

## Kdy to JDE a kdy NE

- **Next.js / jakýkoli statický web s vlastním hostingem** → IDEÁLNÍ. Snímky se dají
  do `public/frames/`, servíruje je CDN, JS scrubber je čistý React/DOM. **Nic se
  nenahrává přes Claude — snímky jen lokálně zkopíruj** (`cp`), žádné překódování.
- **Odoo `arch.xml`** → krkolomné. Potřebuje (a) snímky hostované na veřejné URL
  (např. už nasazený Vercel `…/frames/0001.webp`) a (b) `<script>` v arch.xml (proti
  pravidlu no-JS). Sprite do 1 souboru nejde složit bez ImageMagick/ffmpeg/Pillow
  (na tomhle stroji nejsou — `convert`/`python3` jsou jen Windows stuby). Dělej jen
  když je appka už deploynutá a uživatel kývne na script + cross-origin URL.

## Příprava snímků (levné na data)

Snímky bývají číslované `0001.webp … NNNN.webp`. Rozměry zjisti z webp hlavičky
(`xxd -l 40 0001.webp`): VP8 lossy → po start kódu `9d 01 2a` jsou 2B šířka + 2B výška
(LE, &0x3fff). Card Trader měl 1248×704, 153 snímků, ~11 MB.

```bash
# rozbalit a zkopírovat do public (NIC přes Claude, žádný upload)
unzip -o -q scroll-frames-webp.zip -d /tmp/sf
mkdir -p app/public/frames && cp /tmp/sf/*.webp app/public/frames/
```

## Hero.tsx — odladěný scrubber (Next.js / React, žádné Next-specific API)

Princip: sekce je vysoký „track" (`h-[250vh]`) s **sticky** vnitřkem (`sticky top-0
h-screen`). Progress = `-rect.top / (trackHeight - innerHeight)` → index snímku.
Snímky se přednačtou, kreslí přes `requestAnimationFrame`, cover-fit, retina (dpr≤2).

```tsx
"use client";
import { useEffect, useRef } from "react";

const FRAME_COUNT = 153;
const frameSrc = (i: number) => `/frames/${String(i + 1).padStart(4, "0")}.webp`;

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const frames: HTMLImageElement[] = [];

    const draw = (index: number) => {
      const img = frames[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      if (cw === 0 || ch === 0) return;
      if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
      let w: number, h: number, x: number, y: number;
      if (cr > ir) { w = cw; h = cw / ir; x = 0; y = (ch - h) / 2; }
      else { h = ch; w = ch * ir; x = (cw - w) / 2; y = 0; }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
      currentRef.current = index;
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === 0 && currentRef.current === -1) draw(0);
        else if (i === currentRef.current) draw(i);
      };
      frames[i] = img;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const distance = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(distance, 1));
      const progress = distance > 0 ? scrolled / distance : 0;
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
      draw(index);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0f]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]/85" />
        {/* volitelný overlay: podtitulek + CTA dole (bottom-0, z-10) */}
      </div>
    </section>
  );
}
```

### Ladění
- **Rychlost scrubu** = výška tracku `h-[250vh]`. Víc vh = pomalejší/delší animace.
- **Směr** = pořadí snímků; obrátíš `frameSrc` indexem.
- **Plynulost**: snímky se přednačtou; `requestAnimationFrame` throttluje scroll.
- **Ostrost**: `dpr` capnuté na 2 (paměť). Cover-fit drží poměr stran.
- `new window.Image()` (DOM konstruktor), NE `next/image`. Canvas = žádný `<img>`
  lint warning.

## LoadingScreen.tsx — Lottie intro (bulbasaur)

Tmavá celoobrazovka + `.lottie` animace přes web-komponentu `dotlottie-wc`, fade-out
po ~2.6 s. Script se injektuje jednou; element přes `createElement` (kvůli TS typování
custom elementu). Drží scroll na vrcholu (scroll lock) než intro doběhne.

```tsx
"use client";
import { useState, useEffect, createElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!document.querySelector("script[data-dotlottie]")) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js";
      s.dataset.dotlottie = "true";
      document.head.appendChild(s);
    }
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    const lock = setInterval(() => window.scrollTo(0, 0), 50);
    const t = setTimeout(() => {
      setDone(true); clearInterval(lock); document.body.style.overflow = ""; onDone?.();
    }, 2600);
    return () => { clearTimeout(t); clearInterval(lock); document.body.style.overflow = ""; };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f]">
          {createElement("dotlottie-wc", {
            src: "https://lottie.host/<ID>/<file>.lottie",
            autoplay: true, loop: true,
            style: { width: "300px", height: "300px", maxWidth: "70vw", maxHeight: "70vw" },
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Pozn. k Odoo arch.xml variantě (kdyby fakt bylo potřeba)
- base URL snímků = nasazený Vercel (`https://<projekt>.vercel.app/frames/0001.webp`),
- v `<script>` v arch.xml stejný scrubber, ale **escapuj**: každý `&` → `&amp;`,
  každý raw `<` (např. `i < n`) → `&lt;`, `&&` přepiš na vnořené `if`y (viz memory
  pravidla pro Odoo arch.xml). Web-komponenty/canvas potřebují JS, takže to porušuje
  no-JS pravidlo — dělej jen s explicitním souhlasem uživatele.
