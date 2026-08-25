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

export default function HomePage() {
  return (
    <>
      <PageMeta
        title={`Montaj mobilă și dulapuri Chișinău | ${business.name}`}
        description="Servicii de montaj mobilă și specializare în dulapuri în Chișinău și alte localități din Republica Moldova. Montaj atent, comunicare clară, ofertă gratuită și fără obligații."
        path="/"
        jsonLd={buildLocalBusinessJsonLd()}
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
