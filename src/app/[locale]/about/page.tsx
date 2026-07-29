import AboutHeroSection from "../_sections/about/hero";
import AboutIntro from "../_sections/about/intro";
import CompanyOverview from "../_sections/about/company-overview";
import DirectionsSection from "../_sections/about/directions";
import AboutHistory from "../_sections/about/history";
import CertificationsSection from "../_sections/about/certifications";

export default function About() {
  return (
    <div>
      <AboutHeroSection />
      <AboutIntro />
      <CompanyOverview />
      <DirectionsSection />
      <AboutHistory />
      <CertificationsSection />
    </div>
  );
}
