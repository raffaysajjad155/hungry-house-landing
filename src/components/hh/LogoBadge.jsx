export function Emblem({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 62"
      className={className}
      role="img"
      aria-label="Hungry House emblem"
      fill="none"
    >
      {/* house */}
      <rect x="42" y="11" width="6" height="9" fill="#FFFFFF" stroke="#140A08" strokeWidth="3" />
      <path d="M11 27 L32 8 L53 27 Z" fill="#FFFFFF" stroke="#140A08" strokeWidth="3.4" strokeLinejoin="round" />
      <rect x="27" y="16.5" width="10" height="9" fill="#FFD700" stroke="#140A08" strokeWidth="2.6" />
      {/* burger */}
      <path d="M10 44h44v3.6C54 52.6 50.4 56 45.6 56H18.4C13.6 56 10 52.6 10 47.6V44Z" fill="#F0A83A" stroke="#140A08" strokeWidth="2.8" />
      <rect x="9" y="36.5" width="46" height="7.5" rx="3.7" fill="#E12C2C" stroke="#140A08" strokeWidth="2.8" />
      <path d="M10 36.5c0-9.6 9.8-15.5 22-15.5s22 5.9 22 15.5H10Z" fill="#F5B94B" stroke="#140A08" strokeWidth="2.8" />
      <ellipse cx="23" cy="29" rx="2.1" ry="1.3" fill="#FFF4DC" />
      <ellipse cx="32" cy="26" rx="2.1" ry="1.3" fill="#FFF4DC" />
      <ellipse cx="41" cy="29" rx="2.1" ry="1.3" fill="#FFF4DC" />
    </svg>
  );
}

export default function LogoBadge({ size = 56, ring = 3, className = "" }) {
  return (
    <span
      className={`inline-grid place-items-center rounded-full bg-white ${className}`}
      style={{
        width: size || undefined,
        height: size || undefined,
        boxShadow: `0 0 0 ${ring}px #FFD700`,
      }}
    >
      <Emblem className="h-[78%] w-[78%]" />
    </span>
  );
}