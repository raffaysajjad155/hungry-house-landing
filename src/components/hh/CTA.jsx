import { Phone, ArrowRight, Download, MapPin } from "lucide-react";

const tones = {
  primary:
    "bg-[#1F7A1F] text-white border-[3px] border-hh-gold hover:bg-[#248C24] hover:shadow-[0_0_30px_rgba(255,165,0,.45)]",
  secondary:
    "bg-transparent text-hh-cream border-2 border-hh-gold hover:bg-hh-gold hover:text-hh-ink",
  call: "bg-[#D40000] text-white border-2 border-white/25 hover:bg-[#E12C2C]",
  gold: "bg-hh-gold text-hh-ink border-2 border-hh-ink hover:bg-hh-orange",
  ink: "bg-hh-ink text-hh-cream border-2 border-hh-ink/30 hover:bg-black",
};

export function WhatsAppIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.29-.29.43-.44.15-.14.19-.25.29-.41.1-.17.05-.31-.05-.44-.1-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.11.16 1.53.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export default function CTA({
  href,
  children,
  tone = "primary",
  icon = "whatsapp",
  className = "",
  onClick,
}) {
  const icons = {
    whatsapp: <WhatsAppIcon />,
    phone: <Phone className="h-4 w-4" />,
    arrow: <ArrowRight className="h-4 w-4" />,
    download: <Download className="h-4 w-4" />,
    pin: <MapPin className="h-4 w-4" />,
    none: null,
  };

  const isExternal = href?.startsWith("http") || href?.startsWith("tel:");

  return (
    <a
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`hh-brand inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-6 py-3 text-base leading-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[.98] ${tones[tone]} ${className}`}
      {...(isExternal ? {} : {})}
    >
      {icons[icon]}
      <span>{children}</span>
    </a>
  );
}