import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";
import TiltCard from "./TiltCard";
import { useCountUp, rs } from "@/lib/format";
import { WhatsAppIcon } from "./CTA";
import { AddToCartButton } from "./CartDrawer";

export default function DealCard({ deal, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const price = useCountUp(deal.price, inView);

  const cartItem = {
    id: deal.id ?? deal.name ?? `deal-${index + 1}`,
    name: deal.name ?? `Deal ${String(index + 1).padStart(2, "0")}`,
    desc: deal.includes.join(" + "),
    price: deal.price,
  };

  return (
    <div ref={ref} className="h-full">
      <TiltCard className="h-full rounded-[26px]">
        <article className="relative flex h-full flex-col rounded-[26px] border-[3px] border-[#D40000]/85 bg-[#FFFBF0] p-6 text-hh-ink shadow-[0_20px_45px_rgba(20,10,8,.14)]">
          <span className="absolute left-3 top-3 h-2 w-2 border-l border-t border-hh-ink/30" />
          <span className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-hh-ink/30" />

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="hh-label text-[#D40000]">Deal {String(index + 1).padStart(2, "0")}</p>
              <p className="hh-brand mt-1 text-[42px] leading-none text-[#D40000]">
                {rs(price)}
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-hh-gold text-hh-ink">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
          </div>

          <div className="relative my-5 border-t-2 border-dashed border-[#D40000]/25">
            <span className="absolute -left-[36px] top-1/2 h-[22px] w-[22px] -translate-y-1/2 rounded-full bg-hh-gold" />
            <span className="absolute -right-[36px] top-1/2 h-[22px] w-[22px] -translate-y-1/2 rounded-full bg-hh-gold" />
          </div>

          <ul className="flex-1 space-y-2">
            {deal.includes.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm font-semibold text-hh-ink/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A1F]" strokeWidth={3} />
                {line}
              </li>
            ))}
          </ul>

          <AddToCartButton item={cartItem} label="Add to cart" className="mt-6 min-h-[48px] w-full" />
        </article>
      </TiltCard>
    </div>
  );
}