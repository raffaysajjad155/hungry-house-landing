import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Image } from "@/components/ui/image";
import { site } from "@/data/siteConfig";
import { pizzaAddOnsExport, pizzaPremium, pizzaRegular, pizzaSpecialty } from "@/data/menu";
import { rs } from "@/lib/format";
import { AddToCartButton } from "./CartDrawer";
import PizzaRing from "./PizzaRing";
import TiltCard from "./TiltCard";

// "Supreme Pizza" -> "supreme-pizza"
const slug = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Your own photo for a specific pizza.
// 1) Put the file in the  public/images  folder
// 2) Add a line here:  "pizza-name-as-slug": "/images/file-name.jpg"
const PIZZA_PHOTOS = {
  "supreme-pizza": "/images/supreme-pizza.jpg",
  "square-pizza": "/images/square-pizza.jpg",
};

// Photos that are a pizza on a plain black / transparent background.
// They are blended into the card instead of showing a black box.
const CUTOUT_PHOTOS = ["square-pizza"];

// Fallback photos for pizzas that have no own photo.
// Only pizza pictures here. (site.images.spread shows burgers and wings, so it is NOT used.)
const FLAVOUR_IMAGES = [
  site.images.pizzaTikka,
  site.images.pizzaSupreme,
  site.images.cheesePull,
  site.images.crown,
];

const SPECIALTY_IMAGES = {
  "hunger-extreme-special": site.images.pizzaSupreme,
  "crown-crust-pizza": site.images.crown,
  "square-pizza": site.images.pizzaTikka,
  "kabab-crust-pizza": site.images.cheesePull,
  "cheese-crust-pizza": site.images.crown,
};

const decorate = (list) =>
  list.map((item, index) => ({
    ...item,
    image: PIZZA_PHOTOS[slug(item.name)] || FLAVOUR_IMAGES[index % FLAVOUR_IMAGES.length],
  }));

const TABS = [
  { id: "regular", label: "Regular", items: decorate(pizzaRegular) },
  { id: "premium", label: "Premium", items: decorate(pizzaPremium) },
  { id: "specialty", label: "Crust Specials" },
];

/* One Crust Special card: pick a size, then Add to cart */
function SpecialtyCard({ item }) {
  const [picked, setPicked] = useState(0);
  const variant = item.variants[Math.min(picked, item.variants.length - 1)];

  return (
    <TiltCard className="rounded-[26px]">
      <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-hh-gold/40 bg-white/[0.04] backdrop-blur-md">
        {CUTOUT_PHOTOS.includes(slug(item.name)) ? (
          <div
            className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(225,44,44,.32), rgba(255,165,0,.10) 45%, rgba(20,10,8,0) 72%), #1A0F0C",
            }}
          >
            <img
              src={PIZZA_PHOTOS[slug(item.name)]}
              alt={item.name}
              loading="lazy"
              className="h-full w-full scale-[1.12] object-contain"
              style={{
                mixBlendMode: "screen",
                filter: "drop-shadow(0 18px 28px rgba(0,0,0,.55))",
              }}
            />
          </div>
        ) : (
          <div className="aspect-[4/3] w-full overflow-hidden">
            <Image
              src={
                PIZZA_PHOTOS[slug(item.name)] ||
                SPECIALTY_IMAGES[item.id] ||
                site.images.pizzaSupreme
              }
              alt={item.name}
              className="h-full w-full"
              fittingType="fill"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="hh-display text-2xl text-hh-cream">{item.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.variants.map((option, index) => {
              const selected = index === Math.min(picked, item.variants.length - 1);
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setPicked(index)}
                  aria-pressed={selected}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/50 ${
                    selected
                      ? "border-hh-gold bg-hh-gold text-hh-ink"
                      : "border-hh-gold/50 text-hh-gold hover:bg-hh-gold hover:text-hh-ink"
                  }`}
                >
                  {option.label} · {rs(option.price)}
                </button>
              );
            })}
          </div>
          <AddToCartButton
            item={{
              id: item.id ?? slug(item.name),
              name: item.name,
              price: variant.price,
              variant: variant.label,
            }}
            label="Add to cart"
            className="mt-5 min-h-[46px] w-full"
          />
        </div>
      </article>
    </TiltCard>
  );
}

export default function PizzaPlanet() {
  const [tab, setTab] = useState("regular");
  const [activeIndex, setActiveIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(1);

  const activeTab = TABS.find((item) => item.id === tab);
  const flavours = activeTab.items || [];
  const active = flavours[Math.min(activeIndex, flavours.length - 1)] || flavours[0];
  const size = active?.variants
    ? active.variants[Math.min(sizeIndex, active.variants.length - 1)]
    : null;

  return (
    <section
      id="pizza"
      className="relative overflow-hidden bg-hh-ink pb-20 pt-24 md:pb-28 md:pt-32"
    >
      <div
        className="absolute left-1/2 top-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle,rgba(225,44,44,.3),transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle,rgba(255,165,0,.24),transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="text-center">
          <p className="hh-label text-hh-gold">Pizza Planet</p>
          <h2 className="hh-display mt-2 text-[clamp(40px,7vw,96px)] text-hh-cream">
            PIZZA <span className="hh-gold-text">PLANET</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-hh-cream/65 md:text-base">
            Spin the planet, pick your slice.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id);
                setActiveIndex(0);
                setSizeIndex(1);
              }}
              aria-pressed={tab === item.id}
              className={`hh-brand min-h-[44px] rounded-full border-2 px-5 text-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/60 ${
                tab === item.id
                  ? "border-hh-gold bg-hh-gold text-hh-ink"
                  : "border-hh-gold/40 text-hh-cream/80 hover:border-hh-gold hover:text-hh-gold"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "specialty" ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pizzaSpecialty.map((item) => (
              <SpecialtyCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <PizzaRing
                key={tab}
                items={flavours}
                onActiveChange={setActiveIndex}
              />
              <p className="mt-2 flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-hh-cream/40">
                <MoveHorizontal className="h-4 w-4" />
                Drag · swipe · arrow keys
              </p>
            </div>

            <div className="rounded-[26px] border border-hh-gold/35 bg-white/[0.05] p-6 backdrop-blur-md md:p-7">
              <p className="hh-label text-hh-gold">Now showing</p>
              <h3 className="hh-display mt-2 text-[clamp(28px,3.4vw,44px)] text-hh-cream">
                {active.name}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {active.variants.map((variant, index) => (
                  <button
                    key={variant.label}
                    type="button"
                    onClick={() => setSizeIndex(index)}
                    aria-pressed={index === Math.min(sizeIndex, active.variants.length - 1)}
                    className={`min-h-[44px] rounded-full border-2 px-4 text-xs font-extrabold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/50 ${
                      index === Math.min(sizeIndex, active.variants.length - 1)
                        ? "border-hh-gold bg-hh-gold text-hh-ink"
                        : "border-hh-gold/35 text-hh-cream/75 hover:border-hh-gold hover:text-hh-gold"
                    }`}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>

              <p className="hh-brand mt-6 text-[44px] leading-none text-hh-gold">
                {size ? rs(size.price) : "—"}
              </p>

              <p className="mt-4 text-[11px] font-extrabold uppercase leading-relaxed tracking-[0.16em] text-hh-cream/45">
                Add-ons:{" "}
                {pizzaAddOnsExport.map((addOn) => `${addOn.name} ${rs(addOn.price)}`).join(" · ")}
              </p>

              <AddToCartButton
                item={{
                  id: active.id ?? slug(active.name),
                  name: active.name,
                  price: size ? size.price : active.variants[0].price,
                  variant: size ? size.label : active.variants[0].label,
                }}
                label="Add to cart"
                className="mt-6 min-h-[52px] w-full border-[3px] px-5 text-base"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}