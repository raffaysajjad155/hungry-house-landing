import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "hh-cart-v1";
const CartContext = createContext(null);

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked: cart still works for this visit */
    }
  }, [items]);

  // item: { id, name, desc?, price, variant? }
  const addItem = useCallback((item, openDrawer = false) => {
    const key = `${item.id}::${item.variant || ""}`;
    setItems((prev) => {
      const found = prev.find((entry) => entry.key === key);
      if (found) {
        return prev.map((entry) =>
          entry.key === key ? { ...entry, qty: entry.qty + 1 } : entry
        );
      }
      return [
        ...prev,
        {
          key,
          name: item.variant ? `${item.name} (${item.variant})` : item.name,
          desc: item.desc || "",
          price: Number(item.price) || 0,
          qty: 1,
        },
      ];
    });
    if (openDrawer) setOpen(true);
  }, []);

  const inc = useCallback(
    (key) =>
      setItems((prev) =>
        prev.map((entry) => (entry.key === key ? { ...entry, qty: entry.qty + 1 } : entry))
      ),
    []
  );

  const dec = useCallback(
    (key) =>
      setItems((prev) =>
        prev
          .map((entry) => (entry.key === key ? { ...entry, qty: entry.qty - 1 } : entry))
          .filter((entry) => entry.qty > 0)
      ),
    []
  );

  const remove = useCallback(
    (key) => setItems((prev) => prev.filter((entry) => entry.key !== key)),
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, entry) => sum + entry.qty, 0);
    const subtotal = items.reduce((sum, entry) => sum + entry.qty * entry.price, 0);
    return { items, count, subtotal, open, setOpen, addItem, inc, dec, remove, clear };
  }, [items, open, addItem, inc, dec, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}