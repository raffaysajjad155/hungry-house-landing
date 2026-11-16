import { useEffect, useState } from "react";

const isReduced = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("hh-reduce");

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches || isReduced());
    sync();
    mq.addEventListener("change", sync);
    window.addEventListener("hh:reduce", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("hh:reduce", sync);
    };
  }, []);

  return reduced;
}

export default usePrefersReducedMotion;