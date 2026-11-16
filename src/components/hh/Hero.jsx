import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { site } from "@/data/siteConfig";
import { deals, menuCount, midnightDeals } from "@/data/menu";
import { msgGeneric, waLink } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import LogoBadge from "./LogoBadge";
import CTA from "./CTA";
import Sticker from "./Sticker";
import SparkField from "./SparkField";

const ORBIT = [
  { src: site.images.zinger, alt: "Crispy Zinger burger", width: "clamp(84px,9vw,150px)", pos: "left-[3%] top-[30%]", depth: 1.5, delay: "0s", hide: "hidden sm:block" },
  { src: site.images.pizzaSupreme, alt: "Supreme pizza", width: "clamp(88px,10vw,168px)", pos: "right-[4%] top-[26%]", depth: 1.9, delay: "1.1s", hide: "" },
  { src: site.images.wings, alt: "Hot wings box", width: "clamp(62px,6.5vw,104px)", pos: "right-[24%] top-[8%]", depth: 2.4, delay: "0.6s", hide: "hidden md:block" },
  { src: site.images.fries, alt: "Loaded fries", width: "clamp(66px,7vw,110px)", pos: "left-[12%] bottom-[16%]", depth: 1.2, delay: "1.6s", hide: "hidden md:block" },
  { src: site.images.wrap, alt: "Grilled chicken wrap", width: "clamp(64px,6.5vw,102px)", pos: "right-[16%] bottom-[14%]", depth: 1.3, delay: "0.3s", hide: "hidden md:block" },
  { src: site.images.cheesePull, alt: "Pizza cheese pull", width: "clamp(56px,5vw,84px)", pos: "left-[36%] top-[5%]", depth: 2.8, delay: "2.1s", hide: "hidden lg:block" },
];

const MOBILE_DISCS = [ORBIT[0], ORBIT[1], ORBIT[4]];

function Headline({ text, className = "", ready, delay = 0 }) {
  return (
    <span className="block overflow-hidden" aria-hidden="true">
      <motion.span
        initial={{ y: "108%" }}
        animate={ready ? { y: "0%" } : { y: "108%" }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`block ${className}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

function Disc({ item, index, ready }) {
  return (
    <div
      className={`absolute ${item.pos} ${item.hide} z-20 pointer-events-none`}
      style={{ width: item.width }}
      aria-hidden="true"
    >
      <div className="hh-float" style={{ animationDelay: item.delay }}>
        <div className={ready ? "hh-pop" : "opacity-0"} style={{ animationDelay: `${0.35 + index * 0.09}s` }}>
          <div
            className="relative aspect-square w-full rounded-full p-[2.5px]"
            style={{
              background: "linear-gradient(135deg,#FFD700,#FFA500)",
              boxShadow: "0 18px 45px rgba(0,0,0,.55), 0 0 34px rgba(255,165,0,.22)",
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full border-2 border-hh-ink/50">
              <Image src={item.src} alt={item.alt} className="h-full w-full" fittingType="fill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ ready }) {
  const stageRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [ptr, setPtr] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return undefined;
    const el = stageRef.current;
    if (!el) return undefined;
    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      setPtr({
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <section
      id="top"
      ref={stageRef}
      className="hh-grain hh-min-screen relative isolate overflow-hidden bg-hh-ink pb-28 pt-24 md:pb-16 md:pt-32"
    >
      <div className="hh-hud-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle,rgba(255,165,0,.28),transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 top-1/4 h-[460px] w-[460px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle,rgba(225,44,44,.3),transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 h-[360px] w-[420px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle,rgba(45,155,43,.22),transparent 70%)" }}
        aria-hidden="true"
      />
      <SparkField count={70} className="absolute inset-0 h-full w-full" />

      <div className="relative z-30 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-hh-gold" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.34em] text-hh-gold">
                {site.city} · Pizza · Burgers · Wings
              </span>
            </div>

            <h1 className="hh-display text-[clamp(52px,12.5vw,168px)] text-hh-cream">
              <span className="sr-only">The House of Cravings — Hungry House, Multan</span>
              <Headline text="THE HOUSE" ready={ready} delay={0.1} />
              <Headline text="OF CRAVINGS" className="hh-gold-text" ready={ready} delay={0.22} />
            </h1>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Sticker tone="gold" rotate={-5}>House of Smash</Sticker>
              <Sticker tone="cream" rotate={4}>Crunchy Zinger</Sticker>
              <Sticker tone="red" rotate={-3}>Cheese Pull</Sticker>
              <Sticker tone="gold" rotate={6} className="hidden sm:inline-block">Midnight Deals</Sticker>
            </div>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-hh-cream/75 md:text-lg">
              Pizza, smashed burgers, wings, wraps &amp; deals — hot from Jamshed Arcade, Multan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTA href={waLink(msgGeneric())} tone="primary" className="w-full sm:w-auto">
                Order on WhatsApp
              </CTA>
              <CTA href="#menu" tone="secondary" icon="arrow" className="w-full sm:w-auto">
                Explore Menu
              </CTA>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-hh-cream/55">
              <span className="relative px-3 py-1">
                <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-hh-gold" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-hh-gold" />
                {menuCount} items
              </span>
              <span className="relative px-3 py-1">
                <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-hh-gold" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-hh-gold" />
                {deals.length} deals + {midnightDeals.length} midnight
              </span>
              <span className="relative px-3 py-1">
                <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-hh-gold" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-hh-gold" />
                {site.city} · PK
              </span>
            </div>
          </div>

          <div className="relative hidden min-h-[440px] lg:col-span-4 lg:block" aria-hidden="true" />
        </div>

        {/* mobile disc row */}
        <div className="mt-10 flex items-end justify-center gap-4 lg:hidden" aria-hidden="true">
          {MOBILE_DISCS.map((item, i) => (
            <div
              key={item.src}
              className={ready ? "hh-pop" : "opacity-0"}
              style={{ width: i === 1 ? "30%" : "24%", animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <div className="hh-float" style={{ animationDelay: item.delay }}>
                <div
                  className="relative aspect-square w-full rounded-full p-[2px]"
                  style={{ background: "linear-gradient(135deg,#FFD700,#FFA500)", boxShadow: "0 12px 30px rgba(0,0,0,.5)" }}
                >
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <Image src={item.src} alt="" className="h-full w-full" fittingType="fill" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* desktop coin + orbit */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block" aria-hidden="true">
        <div
          className="absolute left-[78%] top-[46%] w-[clamp(140px,12vw,196px)] -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate3d(calc(-50% + ${ptr.x * 22}px), calc(-50% + ${ptr.y * 18}px), 0)`,
            perspective: "900px",
          }}
        >
          <div className={ready ? "hh-pop" : "opacity-0"} style={{ animationDelay: "0.25s" }}>
            <div className="hh-coin-sway">
              <div
                className="relative aspect-square w-full"
                style={{ filter: "drop-shadow(0 24px 50px rgba(0,0,0,.6))" }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "conic-gradient(from 210deg,#FFD700,#FFA500,#FFD700,#C98A00,#FFD700)" }}
                />
                <div className="absolute inset-[9%] grid place-items-center rounded-full bg-white">
                  <LogoBadge size={0} ring={0} className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {ORBIT.map((item, i) => (
          <Disc key={item.src} item={item} index={i} ready={ready} />
        ))}
      </div>
    </section>
  );
}