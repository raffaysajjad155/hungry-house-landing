import { useEffect, useState } from "react";
import { Download, Facebook, Instagram } from "lucide-react";
import { site } from "@/data/siteConfig";
import { downloadMenuPdf } from "@/lib/downloadMenuPdf";
import LogoBadge from "./LogoBadge";
import Wave from "./Wave";

const LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Pizza", href: "#pizza" },
  { label: "Midnight", href: "#midnight" },
  { label: "Find Us", href: "#find-us" },
];

export default function Footer() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(document.documentElement.classList.contains("hh-reduce"));
  }, []);

  const toggleMotion = () => {
    const next = !reduced;
    setReduced(next);
    document.documentElement.classList.toggle("hh-reduce", next);
    window.dispatchEvent(new Event("hh:reduce"));
  };

  return (
    <footer className="relative overflow-hidden bg-hh-ink pb-24 pt-20 md:pb-10 md:pt-24">
      <Wave fill="#FFF4DC" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <LogoBadge size={52} ring={3} />
            <span>
              <span className="hh-display block text-xl text-hh-cream">
                HUNGRY <span className="text-[#E12C2C]">HOUSE</span>
              </span>
              <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.3em] text-hh-gold">
                The House of Cravings
              </span>
            </span>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-hh-cream/65 transition-colors hover:text-hh-gold"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={downloadMenuPdf}
              className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-hh-gold transition-opacity hover:opacity-80"
            >
              <Download className="h-3.5 w-3.5" /> Download Menu PDF
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hungry House on Facebook"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-hh-cream/75 transition-colors hover:border-hh-gold hover:text-hh-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hungry House on Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-hh-cream/75 transition-colors hover:border-hh-gold hover:text-hh-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-hh-cream/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Hungry House — The House of Cravings · {site.address}</p>
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={reduced}
            className="inline-flex min-h-[40px] w-fit items-center gap-2 rounded-full border border-white/15 px-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-hh-cream/60 transition-colors hover:border-hh-gold hover:text-hh-gold"
          >
            <span
              className={`h-2 w-2 rounded-full ${reduced ? "bg-hh-gold" : "bg-[#2D9B2B]"}`}
            />
            {reduced ? "Motion reduced" : "Reduce motion"}
          </button>
        </div>

        <p
          aria-hidden="true"
          className="hh-display hh-fire-text mt-12 select-none whitespace-nowrap text-center text-[15vw] leading-[0.74] translate-y-[16%]"
        >
          HUNGRY HOUSE
        </p>
      </div>
    </footer>
  );
}