import { useCallback, useState } from "react";
import Preloader from "@/components/hh/Preloader";
import Nav from "@/components/hh/Nav";
import Hero from "@/components/hh/Hero";
import Marquee from "@/components/hh/Marquee";
import SignatureStack from "@/components/hh/SignatureStack";
import Deals from "@/components/hh/Deals";
import PizzaPlanet from "@/components/hh/PizzaPlanet";
import FullMenu from "@/components/hh/FullMenu";
import Midnight from "@/components/hh/Midnight";
import HowToOrder from "@/components/hh/HowToOrder";
import FindUs from "@/components/hh/FindUs";
import Footer from "@/components/hh/Footer";
import MobileOrderBar from "@/components/hh/MobileOrderBar";

export default function Landing() {
  const [ready, setReady] = useState(false);
  const handleLoaded = useCallback(() => setReady(true), []);

  return (
    <div className="min-h-screen bg-hh-ink text-hh-cream">
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-hh-gold focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-hh-ink"
      >
        Skip to the menu
      </a>
      <Preloader onDone={handleLoaded} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <SignatureStack />
        <Deals />
        <PizzaPlanet />
        <FullMenu />
        <Midnight />
        <HowToOrder />
        <FindUs />
      </main>
      <Footer />
      <MobileOrderBar />
    </div>
  );
}