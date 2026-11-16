import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export default function SparkField({ count = 70, className = "" }) {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let frame;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const sparks = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.7 + 0.5,
      speed: Math.random() * 0.32 + 0.1,
      drift: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      sparks.forEach((s) => {
        s.y -= s.speed;
        s.x += s.drift;
        if (s.y < -12) {
          s.y = height + 12;
          s.x = Math.random() * width;
        }
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.r > 1.5 ? "#FFA500" : "#FFD700";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [count, reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}