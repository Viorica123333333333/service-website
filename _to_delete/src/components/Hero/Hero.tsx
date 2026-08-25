import { business } from '../../config/business';
import Icon from '../common/Icon';
import WardrobeAssembly from './WardrobeAssembly';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="Prezentare">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Montaj mobilă &amp; specialist în dulapuri</p>
          <h1 className={styles.headline}>
            Montăm mobila cu grijă, ca să vă bucurați de ea fără bătăi de cap.
          </h1>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.subhead}>
            Montaj profesionist de dulapuri și mobilier în {business.baseLocation} și
            împrejurimi.
          </p>
          <div className={styles.ctaRow}>
            <a href="#contact" className="btn btn-primary">
              Cereți o ofertă
            </a>
            <a
              href={business.whatsappHref}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              Scrieți pe WhatsApp
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
