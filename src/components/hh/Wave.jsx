export default function Wave({ fill = "#FFF4DC", className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 z-0 leading-[0] ${className}`}
    >
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="h-[38px] w-full md:h-[64px]">
        <path
          d="M0 0H1440V34C1240 76 1080 34 900 46C720 58 560 22 360 48C240 64 120 56 0 28Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}