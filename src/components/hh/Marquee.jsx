import { Pizza, Sandwich, Drumstick, CupSoda, Beef, Coffee } from "lucide-react";

const WORDS = [
  "PIZZA",
  "BURGERS",
  "WINGS",
  "WRAPS",
  "SHAWARMA",
  "PASTA",
  "FRIES",
  "DEALS",
  "MIDNIGHT DEALS 11 PM",
];

const ICONS = [Pizza, Sandwich, Drumstick, Beef, CupSoda, Coffee];

function Row({ reverse = false, tone = "gold" }) {
  const bg = tone === "gold" ? "bg-hh-gold" : "bg-hh-orange";
  return (
    <div className={`${bg} overflow-hidden border-y-2 border-hh-ink/20 py-2.5`} aria-hidden="true">
      <div className={`flex w-max ${reverse ? "hh-marquee-rev" : "hh-marquee-fwd"}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {WORDS.map((word, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <span key={`${copy}-${word}`} className="flex items-center gap-4 px-4 text-hh-ink">
                  <span className="hh-display text-xl sm:text-2xl md:text-3xl">{word}</span>
                  <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.4} />
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-10" role="presentation">
      <span className="sr-only">
        Pizza, burgers, wings, wraps, shawarma, pasta, fries, deals and midnight deals from 11 PM.
      </span>
      <Row />
      <Row reverse tone="orange" />
    </div>
  );
}