import { business } from '../../config/business';
import Icon, { type IconName } from '../common/Icon';
import styles from './TrustStrip.module.css';

interface TrustItem {
  icon: IconName;
  label: string;
}

/**
 * Thin, three-column trust strip directly under the hero. Kept as its own
 * component (rather than folded into Hero) so it reads as a distinct,
 * quiet editorial band — plain white, thin rules, no cards — matching the
 * approved target design.
 */
export default function TrustStrip() {
  const items: TrustItem[] = [
    { icon: 'shield-check', label: `Over ${business.yearsExperience} years of experience` },
    { icon: 'map-pin', label: 'Available for on-site visits' },
    { icon: 'sparkles', label: 'Careful, tidy work' },
  ];

  return (
    <section className={styles.strip} aria-label="Trust highlights">
      <div className="container">
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.label} className={styles.item}>
              <span className={styles.icon}>
                <Icon name={item.icon} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
