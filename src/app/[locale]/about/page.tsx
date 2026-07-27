import AboutHeroSection from "../_sections/about/hero";
import CertificationsSection from "../_sections/about/certifications";
import DirectionsSection from "../_sections/about/directions";
import CtaSection from "@/components/section/cta";

export default function About() {
  return (
    <div>
      <AboutHeroSection />
      <CertificationsSection />
      <DirectionsSection />
      <CtaSection />
    </div>
  );
}
