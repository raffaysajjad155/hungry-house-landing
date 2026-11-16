import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { site } from "@/data/siteConfig";
import { msgGeneric, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./CTA";
import Wave from "./Wave";

export default function FindUs() {
  return (
    <section id="find-us" className="relative overflow-hidden bg-hh-cream pb-20 pt-24 text-hh-ink md:pb-28 md:pt-32">
      <Wave fill="#FFD700" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="hh-label text-[#D40000]">Find us</p>
          <h2 className="hh-display mt-2 text-[clamp(38px,7vw,92px)] text-[#D40000]">COME HUNGRY</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border-[3px] border-hh-gold bg-[#FFFBF0] p-6 md:p-8">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D40000] text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="hh-label text-hh-ink/45">Address</p>
                <p className="mt-1 text-base font-semibold leading-relaxed text-hh-ink">
                  {site.address}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <a
                href={waLink(msgGeneric())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order on WhatsApp ${site.waDisplay}`}
                className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-hh-ink/10 bg-white px-4 transition-colors hover:border-[#1F7A1F]"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#1F7A1F]" />
                <span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-hh-ink/45">
                    Delivery / WhatsApp
                  </span>
                  <span className="hh-brand text-lg text-hh-ink">{site.waDisplay}</span>
                </span>
              </a>

              <a
                href={`tel:${site.phone2}`}
                aria-label={`Call Hungry House on ${site.phone2Display}`}
                className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-hh-ink/10 bg-white px-4 transition-colors hover:border-[#D40000]"
              >
                <Phone className="h-5 w-5 text-[#D40000]" />
                <span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-hh-ink/45">
                    Call us
                  </span>
                  <span className="hh-brand text-lg text-hh-ink">{site.phone2Display}</span>
                </span>
              </a>
            </div>

            {site.hours && (
              <p className="mt-6 text-sm font-semibold text-hh-ink/70">{site.hours}</p>
            )}

            <div className="mt-7 flex items-center gap-3 border-t border-dashed border-hh-ink/20 pt-5">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hungry House on Facebook"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-hh-ink/15 text-hh-ink transition-colors hover:border-[#D40000] hover:text-[#D40000]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hungry House on Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-hh-ink/15 text-hh-ink transition-colors hover:border-[#D40000] hover:text-[#D40000]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <span className="hh-brand text-sm text-hh-ink/60">{site.handle}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border-[3px] border-hh-gold bg-white">
            <iframe
              title="Hungry House location in Multan"
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 md:h-[380px]"
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <p className="text-xs font-semibold text-hh-ink/60">{site.address}</p>
              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hh-brand inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border-2 border-hh-ink bg-hh-gold px-4 text-xs text-hh-ink"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}