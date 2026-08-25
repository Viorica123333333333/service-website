import { business } from '../../config/business';
import Icon from '../common/Icon';
import styles from './ServiceArea.module.css';

export default function ServiceArea() {
  return (
    <section className="section" aria-labelledby="zona-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Zona de deservire</p>
          <h2 id="zona-heading" className="section-title">
            Ne deplasăm în {business.baseLocation} și în alte localități, conform înțelegerii
          </h2>
        </div>

        <div className={styles.panel}>
          <div className={styles.item}>
            <span className={styles.iconWrap}>
              <Icon name="map-pin" />
            </span>
            <div>
              <p className={styles.itemLabel}>Localitate de bază</p>
              <p className={styles.itemValue}>{business.baseLocation}</p>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.iconWrap}>
              <Icon name="ruler" />
            </span>
            <div>
              <p className={styles.itemLabel}>Raza de deplasare</p>
              <p className={styles.itemValue}>{business.serviceRadius}</p>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.iconWrap}>
              <Icon name="clock" />
            </span>
            <div>
              <p className={styles.itemLabel}>Program de lucru</p>
              <p className={styles.itemValue}>{business.workingHours}</p>
            </div>
          </div>

          <p className={styles.note}>
            Suntem disponibili pentru deplasări în {business.baseLocation} și în alte localități
            din Republica Moldova ({business.servedAreas}). Disponibilitatea și eventualul cost
            al deplasării ({business.travelCostPolicy}) se confirmă înainte de programare — nu
            afirmăm că deplasarea este gratuită decât dacă acest lucru este confirmat explicit.
          </p>
        </div>
      </div>
    </section>
  );
}
