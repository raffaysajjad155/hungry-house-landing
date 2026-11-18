import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Image } from "@/components/ui/image";
import { site } from "@/data/siteConfig";
import { AddToCartButton } from "./CartDrawer";

// "cart" = the exact item that goes into the cart when the button is pressed
const SCENES = [
  {
    key: "zinger",
    word: "ZINGER",
    title: "Zinger Burger",
    from: "Rs 400",
    image: site.images.zinger,
    bg: "#D40000",
    tone: "light",
    line: "Crunch loud. Order louder.",
    cart: { id: "fav-zinger", name: "Zinger Burger", price: 400 },
  },
  {
    key: "smash",
    word: "SMASH",
    title: "House of Smash",
    from: "Rs 680",
    image: site.images.smash,
    bg: "#FFD700",
    tone: "ink",
    line: "Smashed, stacked, sorted.",
    cart: { id: "fav-smash", name: "Classic Beef Burger", price: 680, variant: "Single Patty" },
  },
  {
    key: "pizza",
    word: "PIZZA",
    title: "Hunger Extreme Special",
    from: "Rs 1350",
    image: site.images.pizzaSupreme,
    bg: "#2D9B2B",
    tone: "ink",
    line: "Cheese pull champions.",
    cart: { id: "fav-hunger-extreme", name: "Hunger Extreme Special", price: 1350, variant: "Medium" },
  },
  {
    key: "wings",
    word: "WINGS",
    title: "Hot Wings",
    from: "6 pcs Rs 380",
    image: site.images.wings,
    bg: "#FFA500",
    tone: "ink",
    line: "Hot, BBQ or honey — pick your fire.",
    cart: { id: "fav-hot-wings", name: "Hot Wings", price: 380, variant: "6 Pcs" },
  },
  {
    key: "fries",
    word: "FRIES",
    title: "Loaded Fries",
    from: "Rs 650",
    image: site.images.fries,
    bg: "#140A08",
    tone: "light",
    line: "Loaded. Layered. Gone.",
    cart: { id: "fav-loaded-fries", name: "Loaded Fries", price: 650 },
  },
];

export default function SignatureStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(SCENES.length - 1, Math.max(0, Math.floor(value * SCENES.length)));
    setIndex(next);
  });

  const scene = SCENES[index];
  const isLight = scene.tone === "light";

  return (
    <section id="favourites" ref={ref} style={{ height: `${SCENES.length * 100}vh` }} className="relative">
      <div
        className="hh-screen sticky top-0 flex items-center overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: scene.bg }}
      >
        <p
          aria-hidden="true"
          className="hh-display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[26vw] leading-none"
          style={{ color: isLight ? "rgba(255,244,220,.11)" : "rgba(20,10,8,.09)" }}
        >
          {scene.word}
        </p>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
          <div key={scene.key} className="hh-pop grid items-center gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p
                className="hh-label"
                style={{ color: isLight ? "rgba(255,244,220,.7)" : "rgba(20,10,8,.6)" }}
              >
                House Favourites · {String(index + 1).padStart(2, "0")} /{" "}
                {String(SCENES.length).padStart(2, "0")}
              </p>
              <h2
                className="hh-display mt-3 text-[clamp(38px,6vw,84px)]"
                style={{ color: isLight ? "#FFF4DC" : "#140A08", lineHeight: 1.12 }}
              >
                {scene.title}
              </h2>
              <p
                className="mt-4 max-w-sm text-base font-semibold md:text-lg"
                style={{ color: isLight ? "rgba(255,244,220,.82)" : "rgba(20,10,8,.75)" }}
              >
                {scene.line}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span
                  className="hh-brand -rotate-3 rounded-md border-2 border-hh-ink bg-hh-cream px-4 py-2 text-lg text-hh-ink shadow-[4px_4px_0_rgba(20,10,8,.9)]"
                >
                  from {scene.from}
                </span>
                <AddToCartButton
                  item={scene.cart}
                  label="Add to cart"
                  className="min-h-[50px] border-[3px] px-6"
                />
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div
                className="mx-auto aspect-square w-[clamp(210px,52vw,400px)] rounded-full p-[4px]"
                style={{
                  background: "linear-gradient(135deg,#FFD700,#FFA500)",
                  boxShadow: "0 30px 70px rgba(0,0,0,.5), 0 0 80px rgba(255,165,0,.28)",
                  transform: "rotate(-4deg)",
                }}
              >
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-hh-ink/40">
                  <Image
                    src={scene.image}
                    alt={scene.title}
                    className="h-full w-full"
                    fittingType="fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          {SCENES.map((item, i) => (
            <span
              key={item.key}
              className="h-8 w-[3px] rounded-full transition-all duration-500"
              style={{
                backgroundColor: i === index ? "#FFD700" : "rgba(20,10,8,.18)",
                height: i === index ? 46 : 22,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}