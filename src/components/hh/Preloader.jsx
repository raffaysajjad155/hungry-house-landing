import { useEffect, useState } from "react";
import LogoBadge from "./LogoBadge";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const LAYERS = [
  { at: 8, height: 22, color: "#F0A83A", radius: "0 0 999px 999px" },
  { at: 30, height: 14, color: "#E12C2C" },
  { at: 50, height: 9, color: "#FFD700" },
  { at: 66, height: 9, color: "#2D9B2B" },
  { at: 80, height: 26, color: "#F5B94B", radius: "14px 14px 999px 999px" },
];

export default function Preloader({ onDone }) {
  const reduced = usePrefersReducedMotion();
  // Har refresh par intro chalegi (sessionStorage wali "seen" check hata di gayi hai).
  const skip = reduced;
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (skip) {
      onDone();
      return undefined;
    }
    let frame;
    const start = performance.now();
    const duration = 1500;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setPct(Math.round(p * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setExiting(true), 140);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [skip, onDone]);

  useEffect(() => {
    if (!exiting) return undefined;
    const timer = setTimeout(() => {
      setDone(true);
      onDone();
    }, 900);
    return () => clearTimeout(timer);
  }, [exiting, onDone]);

  useEffect(() => {
    if (skip || done) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [skip, done]);

  if (skip || done) return null;

  return (
    <div
      className={`hh-wipe fixed inset-0 z-[100] overflow-hidden bg-[#D40000] ${
        exiting ? "-translate-y-full" : ""
      }`}
      aria-hidden="true"
    >
      <div
        className={`flex h-full flex-col items-center justify-center gap-7 px-6 transition-opacity duration-500 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="hh-coin-flip">
          <LogoBadge size={112} ring={6} />
        </div>

        <p className="hh-display text-4xl text-hh-cream sm:text-5xl">HUNGRY YET?</p>

        <div className="flex flex-col-reverse items-center gap-1">
          {LAYERS.map((layer, i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-300"
              style={{
                width: 132 - i * 4,
                height: layer.height,
                background: layer.color,
                borderRadius: layer.radius,
                opacity: pct > layer.at ? 1 : 0,
                transform: pct > layer.at ? "translateY(0)" : "translateY(14px)",
                boxShadow: "0 2px 0 rgba(20,10,8,.35)",
              }}
            />
          ))}
        </div>

        <p className="font-mono text-xs tracking-[0.3em] text-hh-cream/80">{pct}%</p>
      </div>

      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-full h-[14vh] w-full"
        aria-hidden="true"
      >
        <path
          d="M0 0H1440V0C1240 96 1090 24 900 62C710 100 540 40 360 84C240 112 120 64 0 100Z"
          fill="#D40000"
        />
      </svg>
    </div>
  );
}