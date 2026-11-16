const tones = {
  gold: "bg-hh-gold text-hh-ink",
  cream: "bg-hh-cream text-hh-ink",
  red: "bg-[#D40000] text-white",
  green: "bg-[#1F7A1F] text-white",
};

export default function Sticker({ children, tone = "gold", rotate = -6, className = "" }) {
  return (
    <span
      className={`hh-brand inline-block rounded-md border-2 border-hh-ink px-3 py-1.5 text-[11px] uppercase tracking-wide shadow-[4px_4px_0_rgba(20,10,8,.9)] transition-transform duration-300 hover:rotate-0 hover:scale-105 sm:text-xs ${tones[tone]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}