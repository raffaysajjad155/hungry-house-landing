import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/siteConfig";
import { msgGeneric, waLink } from "@/lib/whatsapp";
import CTA from "./CTA";
import Wave from "./Wave";

const STEPS = [
  { number: "1", title: "Pick your craving", copy: "Browse the menu, deals and midnight specials." },
  { number: "2", title: "Send it on WhatsApp", copy: `Message ${site.waDisplay} with what you want.` },
  { number: "3", title: "Hot at your door", copy: "We confirm your address and total on chat." },
];

function Scooter({ className = "" }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true" fill="none">
      <circle cx="26" cy="60" r="13" stroke="#140A08" strokeWidth="4" />
      <circle cx="92" cy="60" r="13" stroke="#140A08" strokeWidth="4" />
      <path d="M26 60h30l12-26h14" stroke="#140A08" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68 34h22l6 26" stroke="#D40000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="62" y="10" width="26" height="20" rx="5" fill="#D40000" stroke="#140A08" strokeWidth="3.5" />
      <path d="M75 10v20M62 20h26" stroke="#FFD700" strokeWidth="2.5" />
      <path d="M92 34l8-14" stroke="#140A08" strokeWidth="4" strokeLinecap="round" />
      <circle cx="46" cy="18" r="6" fill="#140A08" />
      <path d="M46 24v14M46 30l-12 8M46 30l14 6" stroke="#140A08" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function HowToOrder() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0.15, 0.85], ["4%", "78%"]);

  return (
    <section id="order" ref={ref} className="relative overflow-hidden bg-hh-gold pb-20 pt-24 text-hh-ink md:pb-28 md:pt-32">
      <Wave fill="#050B24" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="hh-label text-[#D40000]">How to order</p>
          <h2 className="hh-display mt-2 text-[clamp(38px,7vw,92px)] text-hh-ink">ORDER IN 3 TAPS</h2>
        </div>

        <div className="relative mt-14">
          <svg
            viewBox="0 0 1000 160"
            className="absolute inset-x-0 top-6 hidden h-40 w-full md:block"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M40 110C220 20 380 150 560 70C680 18 820 30 960 86"
              stroke="#140A08"
              strokeOpacity="0.35"
              strokeWidth="3"
              strokeDasharray="10 12"
              strokeLinecap="round"
            />
          </svg>

          <motion.div
            style={{ left }}
            className="pointer-events-none absolute top-0 hidden -translate-x-1/2 md:block"
            aria-hidden="true"
          >
            <Scooter className="h-16 w-24" />
          </motion.div>

          <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="rounded-[26px] border-[3px] border-hh-ink bg-hh-cream p-6 shadow-[6px_6px_0_rgba(20,10,8,.85)] md:mt-16"
              >
                <span className="hh-display grid h-12 w-12 place-items-center rounded-full bg-[#D40000] text-2xl text-white">
                  {step.number}
                </span>
                <h3 className="hh-display mt-4 text-2xl text-hh-ink">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-hh-ink/70">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CTA href={waLink(msgGeneric())} tone="primary" className="w-full sm:w-auto">
            Order on WhatsApp
          </CTA>
          <CTA href={`tel:${site.phone2}`} tone="call" icon="phone" className="w-full sm:w-auto">
            Call {site.phone2Display}
          </CTA>
        </div>
      </div>
    </section>
  );
}