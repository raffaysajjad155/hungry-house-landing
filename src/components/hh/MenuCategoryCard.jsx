import { Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { rs } from "@/lib/format";
import { msgItem } from "@/lib/whatsapp";

export default function MenuCategoryCard({ category, image }) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border-[3px] border-hh-gold bg-hh-card p-5 text-hh-ink shadow-[0_18px_40px_rgba(0,0,0,.35)] md:p-6">
      <header className="relative mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="hh-display text-[22px] !leading-[1.15] text-[#D40000] md:text-[26px]">{category.name}</h3>
          {category.note && (
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-hh-ink/50">
              {category.note}
            </p>
          )}
        </div>
        {image && (
          <span className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-hh-gold">
            <Image src={image} alt="" className="h-full w-full" fittingType="fill" />
          </span>
        )}
      </header>

      <ul className="divide-y divide-hh-ink/10">
        {category.items.map((item) => (
          <li key={item.id} className="flex items-start gap-2 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] font-semibold leading-tight">{item.name}</span>
                <span className="mb-1 h-px flex-1 border-b border-dotted border-hh-ink/35" />
                <span className="hh-brand whitespace-nowrap text-lg leading-none text-[#D40000]">
                  {item.variants ? `from ${rs(item.variants[0].price)}` : rs(item.price)}
                </span>
              </div>

              {item.variants && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.variants.map((variant) => (
                    <a
                      key={variant.label}
                      href={msgItem(item.name, variant.price, variant.label)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#D40000]/30 bg-white/70 px-2.5 py-1 text-[10px] font-bold text-hh-ink transition-colors hover:border-[#D40000] hover:bg-[#D40000] hover:text-white"
                    >
                      {variant.label} · {rs(variant.price)}
                    </a>
                  ))}
                </div>
              )}

              {item.includes && (
                <p className="mt-1 text-xs leading-snug text-hh-ink/65">{item.includes.join(" + ")}</p>
              )}
            </div>

            <a
              href={msgItem(
                item.name,
                item.variants ? item.variants[0].price : item.price,
                item.variants ? item.variants[0].label : ""
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${item.name} on WhatsApp`}
              className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#D40000] text-[#D40000] transition-colors hover:bg-[#D40000] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-ink"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
            </a>
          </li>
        ))}
      </ul>

      {category.addOns && (
        <p className="mt-3 border-t border-dashed border-hh-ink/20 pt-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#D40000]">
          Add-ons: {category.addOns.map((addOn) => `${addOn.name} ${rs(addOn.price)}`).join(" · ")}
        </p>
      )}
    </article>
  );
}