import { benefits } from '../../config/process';
import RevealOnScroll from '../common/RevealOnScroll';
import Icon, { type IconName } from '../common/Icon';
import styles from './WhyChooseUs.module.css';

const ICONS: IconName[] = ['ruler', 'shield-check', 'mail', 'map-pin', 'sparkles', 'check'];

export default function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="beneficii-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Why choose this service</p>
          <h2 id="beneficii-heading" className="section-title">
            Six reasons customers come back with confidence
          </h2>
        </div>

        <ul className={styles.grid}>
          {benefits.map((benefit, index) => (
            <li key={benefit.id}>
              <RevealOnScroll as="article" delayMs={(index % 3) * 80} className={styles.item}>
                <span className={styles.iconWrap}>
                  <Icon name={ICONS[index % ICONS.length] ?? 'check'} />
                </span>
                <div>
                  <h3 className={styles.itemTitle}>{benefit.title}</h3>
                  <p className={styles.itemText}>{benefit.description}</p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
