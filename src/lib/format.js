import { useEffect, useState } from "react";

export const rs = (value) => `Rs ${Number(value).toLocaleString("en-US")}`;

export const priceLabel = (item) =>
  item.variants ? rs(item.variants[0].price) : rs(item.price);

export function useCountUp(target, active, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}