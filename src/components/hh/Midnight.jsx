import { midnightDeals } from "@/data/menu";
import { rs } from "@/lib/format";
import { formatRemaining, useMidnightStatus } from "@/lib/useMidnightStatus";
import { msgMidnight } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./CTA";
import StarField from "./StarField";
import Wave from "./Wave";

function Moon() {
  return (
    <svg viewBox="0 0 200 120" className="h-24 w-40 md:h-28 md:w-48" aria-hidden="true">
      <path
        d="M104 18a38 38 0 1 0 0 76 30 30 0 0 1 0-76Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g stroke="#FFD700" strokeWidth="2.4" strokeLinecap="round" opacity=".75">
        <path d="M18 92c10-9 24-9 34 0s24 9 34 0" fill="none" />
        <path d="M42 108c8-7 20-7 28 0s20 7 28 0" fill="none" />
      </g>
    </svg>
  );
}

export default function Midnight() {
  const status = useMidnightStatus();

  return (
    <section
      id="midnight"
      className="relative overflow-hidden bg-hh-navy pb-20 pt-24 md:pb-28 md:pt-32"
    >
      <Wave fill="#062D2E" />
      <StarField className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{ background: "linear-gradient(180deg,rgba(225,44,44,.22),transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Moon />
          <p className="hh-label mt-4 text-hh-gold">Midnight Deals</p>
          <h2 className="hh-display mt-2 text-[clamp(38px,7vw,96px)] text-hh-cream">
            MID NIGHT DEALS
          </h2>
          <p className="mt-4 inline-flex -rotate-1 items-center gap-2 rounded-md border-2 border-hh-ink bg-hh-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-hh-ink">
            <span className="h-2 w-2 rounded-full bg-[#D40000]" />
            11 PM till close
          </p>
          <p className="mt-4 max-w-md text-sm font-semibold text-hh-cream/65 md:text-base">
            Late-night cravings, sorted.
          </p>

          <div className="mt-6">
            {status.live ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2D9B2B] bg-[#2D9B2B]/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#8FE08D]">
                <span className="hh-pulse-dot h-2 w-2 rounded-full bg-[#2D9B2B]" />
                Live now
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-hh-gold/40 bg-white/5 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-hh-gold">
                Starts at 11 PM · in {formatRemaining(status.minutesToStart)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {midnightDeals.map((deal, index) => (
            <article
              key={deal.id}
              className="relative flex flex-col rounded-[26px] border border-hh-gold/35 bg-white/[0.05] p-6 backdrop-blur-md"
            >
              <span className="absolute right-5 top-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-hh-cream/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="hh-display text-2xl text-hh-cream">{deal.name}</h3>
              <p className="mt-2 text-sm font-semibold text-hh-cream/60">
                {deal.includes.join(" + ")}
              </p>
              <p className="hh-brand mt-5 text-[38px] leading-none text-hh-gold">{rs(deal.price)}</p>
              <a
                href={msgMidnight(deal)}
                target="_blank"
                rel="noopener noreferrer"
                className="hh-brand mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-hh-gold bg-[#1F7A1F] text-sm text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/50"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-hh-cream/35">
          Midnight deals are orderable outside the window too — just mention “Midnight deal” on WhatsApp.
        </p>
      </div>
    </section>
  );
}