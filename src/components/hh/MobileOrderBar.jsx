import { Phone } from "lucide-react";
import { site } from "@/data/siteConfig";
import { msgGeneric, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./CTA";

export default function MobileOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-hh-ink/95 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={waLink(msgGeneric())}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order on WhatsApp ${site.waDisplay}`}
          className="hh-brand flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border-2 border-hh-gold bg-[#1F7A1F] px-4 text-sm text-white"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp Order
        </a>
        <a
          href={`tel:${site.phone2}`}
          aria-label={`Call Hungry House on ${site.phone2Display}`}
          className="hh-brand flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-[#D40000] px-4 text-sm text-white"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
      </div>
    </div>
  );
}