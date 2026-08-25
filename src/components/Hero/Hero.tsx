import { business } from '../../config/business';
import Icon from '../common/Icon';
import WardrobeAssembly from './WardrobeAssembly';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="Overview">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Furniture assembly &amp; wardrobe specialist</p>
          <h1 className={styles.headline}>
            We assemble your furniture with care, so you can enjoy it without the hassle.
          </h1>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.subhead}>
            Professional wardrobe and furniture assembly in {business.baseLocation} and the
            surrounding area.
          </p>
          <div className={styles.ctaRow}>
            <a href="#contact" className="btn btn-primary">
              Request a quote
            </a>
            <a
              href={business.whatsappHref}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              Message us on WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.mediaWrap}>
          <WardrobeAssembly />
        </div>
      </div>
    </section>
  );
}
