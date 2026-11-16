import { useRef, useState } from "react";

export default function TiltCard({ children, className = "", max = 7 }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMove = (event) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTransform(
      `perspective(900px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateY(-4px)`
    );
    setGlare({ opacity: 0.3, x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    setTransform("");
    setGlare({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: "preserve-3d" }}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(340px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,.55), transparent 62%)`,
        }}
      />
    </div>
  );
}