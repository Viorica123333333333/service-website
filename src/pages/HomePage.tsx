import SkipLink from '../components/common/SkipLink';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import TrustStrip from '../components/TrustStrip/TrustStrip';
import Services from '../components/Services/Services';
import WardrobeStory from '../components/WardrobeStory/WardrobeStory';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Gallery from '../components/Gallery/Gallery';
import About from '../components/About/About';
import ServiceArea from '../components/ServiceArea/ServiceArea';
import Testimonials from '../components/Testimonials/Testimonials';
import Faq from '../components/Faq/Faq';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';
import { buildLocalBusinessJsonLd } from '../utils/structuredData';

// Hoisted to module scope: the JSON-LD payload has no dependency on props
// or state, so building it once here (rather than inline in JSX, which
// would create a brand-new object reference on every render) keeps
// PageMeta's effect from re-running and re-writing the <head> unnecessarily.
const homeJsonLd = buildLocalBusinessJsonLd();

export default function HomePage() {
  return (
    <>
      <PageMeta
        title={`Furniture & wardrobe assembly Chișinău | ${business.name}`}
        description="Furniture assembly with a speciality in wardrobes, in Chișinău and across Moldova. Careful work, clear communication, free quotes."
        path="/"
        jsonLd={homeJsonLd}
      />
      <SkipLink />
      <Header />
      <main id="continut-principal">
        <Hero />
        <TrustStrip />
        <Services />
        <WardrobeStory />
        <WhyChooseUs />
        <HowItWorks />
        <Gallery />
        <About />
        <ServiceArea />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
