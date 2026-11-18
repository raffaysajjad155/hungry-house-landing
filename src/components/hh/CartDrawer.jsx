import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { rs } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./CTA";

function buildOrderMessage(items, subtotal) {
  const lines = items.map(
    (item, index) => `${index + 1}. ${item.name} x${item.qty} - ${rs(item.price * item.qty)}`
  );
  return [
    "Hi Hungry House! I'd like to place this order:",
    "",
    ...lines,
    "",
    `Subtotal: ${rs(subtotal)}`,
    "",
    "Name: ",
    "Address: ",
  ];
}

/* Header button: shows bag icon with item count. Put it inside Nav. */
export function CartButton({ className = "" }) {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} items`}
      className={`relative grid h-11 w-11 place-items-center rounded-full border border-hh-gold/60 text-hh-cream transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-gold ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-hh-gold px-1 text-[11px] font-extrabold text-hh-ink">
          {count}
        </span>
      )}
    </button>
  );
}

/* Card button: <AddToCartButton item={{ id, name, price, desc, variant }} /> */
export function AddToCartButton({ item, label = "Add to cart", className = "" }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => addItem(item)}
      className={`hh-brand inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 border-hh-gold bg-[#1F7A1F] px-5 text-sm text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/60 ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {label}
    </button>
  );
}

export default function CartDrawer() {
  const { items, count, subtotal, open, setOpen, inc, dec, remove, clear } = useCart();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, setOpen]);

  if (!open) return null;

  const checkoutHref = waLink(buildOrderMessage(items, subtotal));

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your order">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-[2px]"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-[#062B28] text-hh-cream shadow-[-20px_0_60px_rgba(0,0,0,.5)]">
        <header className="flex items-center justify-between gap-3 border-b border-hh-gold/15 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-hh-gold text-hh-ink">
              <ShoppingBag className="h-6 w-6" />
            </span>
            <div>
              <h2 className="hh-display text-[26px] leading-none text-hh-cream">Your order</h2>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.16em] text-hh-cream/55">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="grid h-12 w-12 place-items-center rounded-full border border-hh-gold/50 text-hh-cream transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <ShoppingBag className="mx-auto h-10 w-10 text-hh-gold/60" />
                <p className="hh-display mt-4 text-2xl text-hh-cream">Your cart is empty</p>
                <p className="mt-1 text-sm text-hh-cream/60">
                  Add something from the menu to start your order.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="hh-brand mt-5 min-h-[44px] rounded-full border-2 border-hh-gold px-6 text-sm text-hh-gold transition-colors hover:bg-hh-gold hover:text-hh-ink"
                >
                  Browse menu
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="rounded-[22px] border border-hh-gold/20 bg-[#12373A] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[19px] font-extrabold leading-tight text-hh-cream">
                        {item.name}
                      </h3>
                      {item.desc && (
                        <p className="mt-1 text-sm leading-snug text-hh-cream/60">{item.desc}</p>
                      )}
                      <p className="mt-2 text-sm font-extrabold text-hh-gold">
                        {rs(item.price)} each
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-hh-cream/55 transition-colors hover:text-[#FF5A5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-gold"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-hh-gold/30">
                      <button
                        type="button"
                        onClick={() => dec(item.key)}
                        aria-label={`Decrease ${item.name}`}
                        className="grid h-11 w-11 place-items-center rounded-full text-hh-cream transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-gold"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="w-10 text-center text-lg font-extrabold" aria-live="polite">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => inc(item.key)}
                        aria-label={`Increase ${item.name}`}
                        className="grid h-11 w-11 place-items-center rounded-full text-hh-cream transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-gold"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="hh-brand text-[26px] leading-none text-hh-gold">
                      {rs(item.price * item.qty)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-hh-gold/15 bg-[#0C1F1C] px-5 pb-5 pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-hh-cream/55">
                Subtotal
              </span>
              <span className="hh-brand text-[34px] leading-none text-hh-gold">{rs(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs font-semibold text-hh-cream/55">
              Final total is confirmed on WhatsApp. Delivery charges may apply.
            </p>
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hh-brand mt-4 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-full border-[3px] border-hh-gold bg-[#1F7A1F] px-5 text-lg text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold/60"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Checkout on WhatsApp
            </a>
            <button
              type="button"
              onClick={clear}
              className="mx-auto mt-4 block text-sm font-extrabold uppercase tracking-[0.16em] text-hh-cream/55 transition-colors hover:text-hh-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-gold"
            >
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}