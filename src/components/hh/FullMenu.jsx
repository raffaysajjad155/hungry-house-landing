import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { site } from "@/data/siteConfig";
import { categories, getCategory, uiTabs } from "@/data/menu";
import { downloadMenuPdf } from "@/lib/downloadMenuPdf";
import { WhatsAppIcon } from "./CTA";
import MenuCategoryCard from "./MenuCategoryCard";
import Wave from "./Wave";
import { msgGeneric, waLink } from "@/lib/whatsapp";

const CATEGORY_IMAGES = {
  burgers: site.images.zinger,
  "house-of-smash": site.images.smash,
  "pizza-regular": site.images.pizzaTikka,
  "pizza-premium": site.images.pizzaSupreme,
  "pizza-specialty": site.images.crown,
  wings: site.images.wings,
  wraps: site.images.wrap,
  pasta: site.images.cheesePull,
  fries: site.images.fries,
  specials: site.images.fries,
  deals: site.images.spread,
  "midnight-deals": site.images.pizzaSupreme,
};

export default function FullMenu() {
  const [tab, setTab] = useState("all");

  const visible = useMemo(() => {
    const active = uiTabs.find((item) => item.id === tab);
    if (!active || !active.categories) return categories;
    return active.categories.map((id) => getCategory(id)).filter(Boolean);
  }, [tab]);

  return (
    <section id="menu" className="relative overflow-x-clip bg-hh-teal pb-20 pt-24 md:pb-28 md:pt-32">
      <Wave fill="#140A08" />
      <div
        className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rotate-12 rounded-full opacity-25 blur-2xl"
        style={{ background: "radial-gradient(circle,#FFA500,transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hh-label text-hh-gold">Full Menu</p>
            <h2 className="hh-display mt-2 text-[clamp(40px,7vw,96px)] text-hh-cream">
              THE FULL MENU
            </h2>
            <p className="mt-3 max-w-md text-sm font-semibold text-hh-cream/65 md:text-base">
              Everything we cook, one scroll.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={downloadMenuPdf}
              className="hh-brand inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-hh-gold bg-transparent px-5 text-sm text-hh-gold transition-colors hover:bg-hh-gold hover:text-hh-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/50"
            >
              <Download className="h-4 w-4" /> Download menu (PDF)
            </button>
            <a
              href={waLink(msgGeneric())}
              target="_blank"
              rel="noopener noreferrer"
              className="hh-brand inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-hh-gold bg-[#1F7A1F] px-5 text-sm text-white"
            >
              <WhatsAppIcon className="h-4 w-4" /> Order now
            </a>
          </div>
        </div>

        <div className="sticky top-[70px] z-20 -mx-5 mt-8 bg-hh-teal/92 px-5 py-3 backdrop-blur-md md:-mx-10 md:px-10 lg:top-[78px]">
          <div className="hh-no-scrollbar flex gap-2 overflow-x-auto">
            {uiTabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-pressed={tab === item.id}
                className={`hh-brand min-h-[42px] shrink-0 rounded-full border-2 px-4 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/50 ${
                  tab === item.id
                    ? "border-hh-gold bg-hh-gold text-hh-ink"
                    : "border-hh-gold/30 text-hh-cream/75 hover:border-hh-gold hover:text-hh-gold"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((category) => (
            <MenuCategoryCard
              key={category.id}
              category={category}
              image={CATEGORY_IMAGES[category.id]}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-hh-gold/25 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-hh-cream/65">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-hh-gold" />
            Prices in PKR. Menu may change please confirm on WhatsApp. Click on the Download Menu button to download the Menu PDF.
          </p>
          <button
            type="button"
            onClick={downloadMenuPdf}
            className="hh-brand inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-hh-gold px-4 text-xs text-hh-gold transition-colors hover:bg-hh-gold hover:text-hh-ink"
          >
            <Download className="h-4 w-4" /> Download menu (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}