import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { rs } from "@/lib/format";
import { useCart } from "@/lib/cart";

/* Shows a tick for a moment after an item is added. */
function useAddedFlash() {
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const flash = () => {
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  };
  return [added, flash];
}

function cartItemFor(item, variant) {
  return {
    id: item.id,
    name: item.name,
    desc: item.includes ? item.includes.join(" + ") : "",
    price: variant ? variant.price : item.price,
    variant: variant ? variant.label : "",
  };
}

function VariantChip({ item, variant }) {
  const { addItem } = useCart();
  const [added, flash] = useAddedFlash();
  return (
    <button
      type="button"
      onClick={() => {
        addItem(cartItemFor(item, variant), false);
        flash();
      }}
      aria-label={`Add ${item.name} ${variant.label} to cart`}
      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors hover:border-[#D40000] hover:bg-[#D40000] hover:text-white ${
        added
          ? "border-[#D40000] bg-[#D40000] text-white"
          : "border-[#D40000]/30 bg-white/70 text-hh-ink"
      }`}
    >
      {added ? "Added" : `${variant.label} · ${rs(variant.price)}`}
    </button>
  );
}

function PlusButton({ item }) {
  const { addItem } = useCart();
  const [added, flash] = useAddedFlash();
  const first = item.variants ? item.variants[0] : null;
  return (
    <button
      type="button"
      onClick={() => {
        addItem(cartItemFor(item, first), false);
        flash();
      }}
      aria-label={`Add ${item.name} to cart`}
      className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#D40000] transition-colors hover:bg-[#D40000] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-ink ${
        added ? "bg-[#D40000] text-white" : "text-[#D40000]"
      }`}
    >
      {added ? (
        <Check className="h-4 w-4" strokeWidth={3} />
      ) : (
        <Plus className="h-4 w-4" strokeWidth={3} />
      )}
    </button>
  );
}

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
                    <VariantChip key={variant.label} item={item} variant={variant} />
                  ))}
                </div>
              )}

              {item.includes && (
                <p className="mt-1 text-xs leading-snug text-hh-ink/65">{item.includes.join(" + ")}</p>
              )}
            </div>

            <PlusButton item={item} />
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