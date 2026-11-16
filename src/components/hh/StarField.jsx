import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export default function StarField({ className = "", count = 110 }) {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let frame;
    let stars = [];

    const build = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0012 + 0.0004,
      }));
    };
    build();

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const alpha = reduced ? 0.6 : 0.25 + 0.75 * Math.abs(Math.sin(time * star.speed + star.phase));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.r > 1.1 ? "#FFD700" : "#FFF4DC";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    draw(0);

    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
    };
  }, [count, reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}