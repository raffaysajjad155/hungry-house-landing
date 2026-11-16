import { deals } from "@/data/menu";
import DealCard from "./DealCard";
import Wave from "./Wave";

export default function Deals() {
  return (
    <section id="deals" className="relative overflow-hidden bg-hh-cream pb-20 pt-24 text-hh-ink md:pb-28 md:pt-32">
      <Wave fill="#140A08" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="hh-label text-[#D40000]">Special Deals</p>
            <h2 className="hh-display mt-2 text-[clamp(40px,7vw,96px)] text-[#D40000]">
              SPECIAL DEALS
            </h2>
            <p className="mt-3 max-w-md text-sm font-semibold text-hh-ink/70 md:text-base">
              Pick a deal. Feed the crew.
            </p>
          </div>
          <p className="max-w-xs text-[11px] font-extrabold uppercase leading-relaxed tracking-[0.18em] text-hh-ink/45 md:text-right">
            Seven bundles · Prices in PKR · Final total confirmed on WhatsApp
          </p>
        </div>

        <div className="hh-no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className={`min-w-[82%] snap-center md:min-w-0 ${
                index === 6 ? "lg:col-start-2" : ""
              }`}
            >
              <DealCard deal={deal} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}