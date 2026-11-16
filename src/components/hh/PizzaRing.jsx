import { useEffect, useRef, useState } from "react";
import { Image } from "@/components/ui/image";

// Own photos from the public folder start with "/" (for example /images/supreme-pizza.png).
// They are shown with a normal <img> inside a black plate ring, so the black border is
// the same on every side, like the other pizzas.
const isLocalImage = (src) => typeof src === "string" && src.startsWith("/");

// --- Fine tuning for your own photos ---------------------------------------
// PHOTO_ZOOM    : bigger number = pizza looks bigger (black ring stays the same)
// PHOTO_SHIFT_X : moves the pizza left (-) or right (+), in percent
// PHOTO_SHIFT_Y : moves the pizza up (-) or down (+), in percent
const PHOTO_ZOOM = 1;
const PHOTO_SHIFT_X = 1;
const PHOTO_SHIFT_Y = 1;

export default function PizzaRing({ items, onActiveChange }) {
  const wrapRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startRot: 0 });
  const movedRef = useRef(0);
  const callbackRef = useRef(onActiveChange);
  callbackRef.current = onActiveChange;

  const [rot, setRot] = useState(0);
  const [radius, setRadius] = useState(260);
  const [idle, setIdle] = useState(true);
  const idleTimer = useRef(null);

  const count = items.length;
  const step = 360 / count;
  const front = ((Math.round(-rot / step) % count) + count) % count;

  useEffect(() => {
    callbackRef.current?.(front);
  }, [front]);

  useEffect(() => {
    setRot(0);
  }, [count]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () =>
      setRadius(Math.max(110, Math.min(el.clientWidth * 0.32, 290)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!idle) return undefined;
    const timer = setInterval(() => setRot((r) => r - step), 2800);
    return () => clearInterval(timer);
  }, [idle, step]);

  useEffect(() => {
    return () => clearTimeout(idleTimer.current);
  }, []);

  const bump = () => {
    setIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 7000);
  };

  const snap = () => {
    dragRef.current.active = false;
    setRot((r) => Math.round(r / step) * step);
  };

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      role="group"
      aria-label="Pizza carousel — use arrow keys, drag or swipe to rotate"
      className="relative h-[clamp(280px,46vw,420px)] w-full select-none outline-none [touch-action:pan-y] focus-visible:ring-2 focus-visible:ring-hh-gold focus-visible:ring-offset-4 focus-visible:ring-offset-hh-ink"
      style={{ perspective: "1200px" }}
      onPointerDown={(event) => {
        dragRef.current = { active: true, startX: event.clientX, startRot: rot };
        movedRef.current = 0;
        bump();
      }}
      onPointerMove={(event) => {
        if (!dragRef.current.active) return;
        const delta = event.clientX - dragRef.current.startX;
        movedRef.current = Math.max(movedRef.current, Math.abs(delta));
        setRot(dragRef.current.startRot + delta * 0.42);
      }}
      onPointerUp={snap}
      onPointerLeave={() => dragRef.current.active && snap()}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          bump();
          setRot((r) => r - step);
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          bump();
          setRot((r) => r + step);
        }
      }}
      onWheel={(event) => {
        if (Math.abs(event.deltaX) > 6) {
          bump();
          setRot((r) => r - event.deltaX * 0.4);
        }
      }}
    >
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, index) => {
          const angle = ((step * index + rot) * Math.PI) / 180;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const depth = (z / radius + 1) / 2;
          const isFront = index === front;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (movedRef.current > 8) return;
                bump();
                setRot(-step * index);
              }}
              aria-label={`Show ${item.name}`}
              aria-pressed={isFront}
              className="absolute left-1/2 top-1/2 h-[clamp(112px,20vw,182px)] w-[clamp(112px,20vw,182px)] rounded-full transition-[transform,opacity,filter] duration-700 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold"
              style={{
                transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) scale(${0.7 + depth * 0.4})`,
                zIndex: Math.round(z + radius),
                opacity: 0.3 + depth * 0.7,
                filter: `blur(${(1 - depth) * 2.4}px)`,
              }}
            >
              <span
                className="block h-full w-full rounded-full p-[3px]"
                style={{
                  background: "linear-gradient(135deg,#FFD700,#FFA500)",
                  boxShadow: isFront
                    ? "0 0 65px rgba(255,165,0,.55), 0 24px 50px rgba(0,0,0,.6)"
                    : "0 12px 26px rgba(0,0,0,.45)",
                }}
              >
                <span className="block h-full w-full overflow-hidden rounded-full border-2 border-hh-ink/40">
                  {isLocalImage(item.image) ? (
                    <span className="block h-full w-full bg-black p-[2%]">
                      <span className="block h-full w-full overflow-hidden rounded-full">
                        <img
                          src={item.image}
                          alt={item.name}
                          draggable={false}
                          className="h-full w-full object-cover"
                          style={{
                            transform: `scale(${PHOTO_ZOOM}) translate(${PHOTO_SHIFT_X}%, ${PHOTO_SHIFT_Y}%)`,
                          }}
                        />
                      </span>
                    </span>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full"
                      fittingType="fill"
                    />
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}