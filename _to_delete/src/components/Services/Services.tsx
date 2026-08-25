import {
  services,
  serviceHighlights,
  scopeClarification,
  brandDisclaimer,
} from '../../config/services';
import RevealOnScroll from '../common/RevealOnScroll';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section id="servicii" className="section" aria-labelledby="servicii-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Servicii</p>
          <h2 id="servicii-heading" className="section-title">
            Servicii de montaj
          </h2>
          <p className="section-lede">
            De la dulapuri complexe cu uși glisante, până la mobilier flatpack pentru orice
            cameră — asamblăm totul conform instrucțiunilor producătorului.
          </p>
        </div>

        <ul className={styles.highlightGrid}>
          {serviceHighlights.map((item, index) => (
            <li key={item.id}>
              <RevealOnScroll as="article" delayMs={index * 90} className={styles.highlightCard}>
                <span className={styles.highlightAccent} aria-hidden="true" />
                <h3 className={styles.highlightTitle}>{item.title}</h3>
                <div className={styles.highlightImageWrap}>
                  <img
                    className={styles.highlightImage}
                    src={item.image}
                    alt={item.alt}
                    width={1000}
                    height={750}
                    loading="lazy"
                  />
                </div>
                <p className={styles.highlightDescription}>{item.description}</p>
              </RevealOnScroll>
            </li>
          ))}
        </ul>

        <h3 className={styles.fullListTitle}>Toate serviciile de montaj</h3>
        <ul className={styles.list}>
          {services.map((service) => (
            <li key={service.id} className={styles.listItem}>
              <div className={styles.listItemHeading}>
                <h4 className={styles.listItemTitle}>{service.title}</h4>
                {service.featured && (
                  <span className={styles.featuredTag}>Specialitate</span>
                )}
              </div>
              <p className={styles.listItemDescription}>{service.description}</p>
            </li>
          ))}
        </ul>

        <div className={styles.scopeNote} role="note">
          <strong>Important de știut</strong>
          {scopeClarification}
        </div>

        <p className={styles.brandNote}>{brandDisclaimer}</p>

        <div className={styles.ctaWrap}>
          <a href="#contact" className="btn btn-primary">
            Trimiteți detaliile lucrării
          </a>
        </div>
      </div>
    </section>
  );
}
