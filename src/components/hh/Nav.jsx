import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import LogoBadge from "./LogoBadge";
import { WhatsAppIcon } from "./CTA";
import { site } from "@/data/siteConfig";
import { msgGeneric, waLink } from "@/lib/whatsapp";

const LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Pizza", href: "#pizza" },
  { label: "Midnight", href: "#midnight" },
  { label: "Find Us", href: "#find-us" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
        setSolid(y > 80);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? "border-b border-white/10 bg-hh-ink/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Hungry House home">
            <LogoBadge size={44} ring={3} className="shrink-0" />
            <span className="hidden leading-none sm:block">
              <span className="hh-display block text-lg tracking-tight text-hh-cream">
                HUNGRY <span className="text-[#E12C2C]">HOUSE</span>
              </span>
              <span className="mt-1 block text-[8px] font-extrabold uppercase tracking-[0.32em] text-hh-gold">
                The House of Cravings
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-hh-cream/75 transition-colors hover:bg-white/5 hover:text-hh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-gold"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={waLink(msgGeneric())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order on WhatsApp ${site.waDisplay}`}
              className="hh-brand hidden min-h-[44px] items-center gap-2 rounded-full border-2 border-hh-gold bg-[#1F7A1F] px-5 text-sm text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/60 sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-hh-gold/60 text-hh-cream lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>

        <div className="h-[2px] w-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-hh-ink/97 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <LogoBadge size={44} ring={3} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-hh-gold/60 text-hh-cream"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-24">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hh-display border-b border-white/10 py-4 text-4xl text-hh-cream transition-colors hover:text-hh-gold"
                style={{
                  animation: `hh-pop .5s cubic-bezier(.22,1,.36,1) both`,
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink(msgGeneric())}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="hh-brand mt-8 flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-hh-gold bg-[#1F7A1F] text-white"
            >
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
            <a
              href={`tel:${site.phone2}`}
              className="hh-brand mt-3 flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-[#D40000] text-white"
            >
              Call {site.phone2Display}
            </a>
          </div>
        </div>
      )}
    </>
  );
}