import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { AutomotiveShowcase } from "@/components/sections/AutomotiveShowcase";
import { AutomotivePricing } from "@/components/pricing/AutomotivePricing";
import { OptionsSection } from "@/components/pricing/OptionsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { HabitationSection } from "@/components/sections/HabitationSection";
import { AirbnbSection } from "@/components/sections/AirbnbSection";
import { ProfessionalsBlock } from "@/components/sections/ProfessionalsBlock";
import { Commitments } from "@/components/sections/Commitments";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServiceShowcase />
      <AutomotiveShowcase />
      <AutomotivePricing />
      <OptionsSection />
      <BeforeAfterSection />
      <HabitationSection />
      <AirbnbSection />
      <ProfessionalsBlock />
      <Commitments />
      <BrandStatement />
      <Testimonials />
      <CTASection />
    </>
  );
}
